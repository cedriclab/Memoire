exports.get = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
};

exports.getScore = function(request, response){
	response.contentType("application/json");
	response.send({score : (Math.random()*5000).toFixed(2)});
};

exports.getResults = function(request, response){
    var includeEmail = Boolean(request.query.email);
    var includeFuture = Boolean(request.query.future);
    
    MongoClient.connect(DBConnectionString, function(err, db) {
		db.collection("users").find({}).sort({"balance" : -1}).toArray(function(error, cursorArray){
			db.close();
            var fields = {};
            (cursorArray || []).forEach(function(user){
                Object.keys(user.financialAssets).forEach(function(assetKey){
                    if (!fields[assetKey]) {
                        fields[assetKey] = true;
                    }
                });
            });
            var fieldsArray = Object.keys(fields);
            
            if (includeFuture) {
                (cursorArray || []).forEach(function(user){
                    for (var i=12; i<60; i++) {
                        Application.user.playTurn(user, 0, i);
                    }
                });
            }
            
            var head = '<!DOCTYPE html><html><head><meta charset="utf8"><title>Résultats</title></head>';
            var body = '<body><h1>Résultats</h1><table><thead><tr><th>ID</th>'+(includeEmail ? '<th>Courriel</th>' : '')+'<th>Balance</th>'+(fieldsArray.map(function(f){return '<th>'+f+'</th>';}).join(''))+'<th>Valeur nette</th></tr></thead><tbody>';
            var foot = '</html>';
            
            (cursorArray || []).forEach(function(user){
                var netWorth = Number(user.balance += 0);
                var userInfo = '<tr><td>'+user._id.toString()+'</td>'+(includeEmail ? '<td>'+user.email+'</td>' : '')+'<td>'+(user.balance || 0).toFixed(2)+'</td>';
                fieldsArray.forEach(function(assetKey){
                    var assetValue = user.financialAssets[assetKey] || 0;
                    netWorth += assetValue;
                    userInfo += '<td>'+(assetValue ? assetValue.toFixed(2) : '')+'</td>'
                });
                userInfo += '<th>'+(netWorth.toFixed(2))+'</th></tr>';
                body += userInfo;
            });
            body += '</tbody></table></body>';
            
			response.contentType("text/html");
			response.send(head+body+foot);
		});
	});
};

exports.update = function(request, response){
	/*
    console.log("UPDATE");
	console.log(request.body);
	console.log(" ");
	response.contentType("application/json");
	response.send({id : request.params.id});
    */
    Application.questions.update(request, response);
};

exports.playTurn = function(user, baseImpact, turn, save){
    
    var mover = Number(baseImpact || 0);
    turn = turn || user.questionsAnswered;
    console.log("TURN IS: %s", turn);
/*	
    (user.answeredGameQuestions || []).forEach(function(q){
        mover += q.recurringImpact;
    });
*/	
    (user.recurringRandom || []).forEach(function(item, randomIndex){
        if (!Data["randoms"]["recurring"][turn][randomIndex]) {
            Data["randoms"]["recurring"][turn][randomIndex] = Math.random();
        }
        if (Data["randoms"]["recurring"][turn][randomIndex] < item.probability) {
            if (item.affects=="balance") {
                mover += item.value;
            } else {
                var namespace = item.affects.split(".");
                if (item.method=="set") {
                    user[namespace[0]][namespace[1]] = item.value;
                } else if (item.method=="inc") {
                    user[namespace[0]][namespace[1]] += item.value;
                }
            }
        }
    });
    Object.keys(user.financialAssets).forEach(function(finKey){
        if (user.financialAssets[finKey] && user.financialAssets[finKey] < 0) {
            user.financialAssets[finKey] *= (1+((user.assets[String(finKey+"Rate")] || 0)/12));
            if (user.financialAssets[finKey] < user.recurringInflux[String(finKey+"Payment")]) {
                user.financialAssets[finKey] -= user.recurringInflux[String(finKey+"Payment")];
            } else {
                user.balance -= user.financialAssets[finKey];
                delete user.financialAssets[finKey];
                delete user.recurringInflux[String(finKey+"Payment")];
            }
        } 
    });
    Object.keys(user.savingPatterns).forEach(function(saveKey){
        if (user.financialAssets[saveKey] !== undefined) {
            var amount = user.savingPatterns[saveKey] || 0;
            user.financialAssets[saveKey] *= (1+((user.assets[String(saveKey+"Rate")] || 0)/12));
            user.financialAssets[saveKey] += amount;
            if (saveKey=="tfsa" && user.financialAssets[saveKey] >= 35000) {
                user.savingPatterns[saveKey] = 0;
            }
            user.balance -= amount;
            console.log("Computing savings for ["+saveKey+"] at "+String(amount)+"$")
        }
    });

    var recurringInflux = user.recurringInflux || {};
    Object.keys(recurringInflux).forEach(function(condition){
        if (recurringInflux[condition]) {
            mover += recurringInflux[condition];
        }
    });
    
    user.balance = (user.balance || 0) + mover;
    
    if (save) {
        MongoClient.connect(DBConnectionString, function(err, db) {
            db.collection("users").updateOne({"_id" : user._id}, {$set : {"balance" : user.balance, "savingPatterns" : user.savingPatterns, "assets" : user.assets, "recurringInflux" : user.recurringInflux, "recurringRandom" : user.recurringRandom, "financialAssets" : user.financialAssets}}, function(error){
                db.close();
            });
        });  
    }
    
    return user.balance;
};

exports.create = function(request, response){
	console.log("CREATE");
    console.log(request.headers["user-agent"]);
	console.log(" ");
	var body = request.body || {};
	var now = Date.now();
	var startBalance = 5000;
	
	var data;
	if (Object.keys(body).length) {
		response.contentType("application/json");
		response.send(data);
	} else {
		var awq = [];
		var agq = [];
		var warmupQuestions = Data["questions"]["warmup"].map(function(q, qi){
					q.id = new ObjectID();
					awq.push({"id" : q.id, "index" : qi, "begunOn" : null, "answeredOn" : null, "answer" : null});
					return q;
				});
		var gameQuestions = Data["questions"]["game"].map(function(q, qi){
					q.id = new ObjectID();
					if (q.resources) {
						q.resources.forEach(function(r, i){
							r.id = String(i+1);
						});
					}
                    q.adviceCost = Data["advice"][q.index].cost;
                    q.rawData = q.rawData || "";
					agq.push({"id" : q.id, "index" : qi, "begunOn" : null, "answeredOn" : null, "answer" : null, "answerHistory" : [], "usedResources" : [], "instantImpact" : 0, "recurringImpact" : 0, "previousBalance" : 0});
					return q;
				});
/*
    Assets should have been class-based
*/
		MongoClient.connect(DBConnectionString, function(err, db) {
			var _id = new ObjectID();
			db.collection("users").insert((new Application.user.User(_id, request.headers["user-agent"], warmupQuestions, gameQuestions, awq, agq, startBalance)), function(){
				db.close();
				response.contentType("application/json");
				response.send({"id" : _id, "balance" : startBalance});
			});
		});
	}
	
};

exports.getNetIncome = function(grossIncome, deductions){
    deductions = deductions || 0;
    var provIncomeTax = (grossIncome - deductions- 11305)*0.16;
    var fedIncomeTax = (grossIncome - deductions - 11138)*0.125;
    return grossIncome - provIncomeTax - fedIncomeTax;
};

exports.User = function(_id, userAgent, warmupQuestions, gameQuestions, awq, agq, startBalance){

                this["_id"] = _id || new ObjectID();
                this["timeLoggedIn"] = Date.now();
                this["warmupQuestions"] = warmupQuestions || [];
                this["gameQuestions"] = gameQuestions || [];
                this["answeredWarmupQuestions"] = awq || [];
                this["answeredGameQuestions"] = agq || [];
                this["personalQuestions"] = Data["questions"]["personal"].map(function(q){
                    q.id = new ObjectID();
                    return q;
                });
                this["balance"] = startBalance || 0;
                this["recurringInflux"] = {
                    "rent" : -325,
                    "food" : -400,
                    "fun" : -200,
                    "phone" : -50,
                    "catFood" : -20,
                    "other" : -200,
                    "salary" : 0,
                    "studentLoanPayment" : -186.43
                };
                this["financialAssets"] = {
                    "capStock" : 0,
                    "studentLoan" : -10000,
                    "rrsp" : 0,
                    "tfsa" : 0
                };
                this["savingPatterns"] = {
                    "rrsp" : 0,
                    "tfsa" : 0,
                    "studentLoan" : 0
                };
                this["assets"] = {
                    "studentLoanRate" : 0.045,
                    "rrspRate" : 0,
                    "tfsaRate" : 0,
                    "hourlyRate" : 20,
                    "workStatus" : 1,
                    "productivity" : 1,
                    "companyStanding" : 1,
                    "timeSpentWithDifficultClient" : 0
                };
                this["recurringRandom"] = [
                    {"probabiliby" : 0.05, "affects" : "assets.studentLoanRate", "method" : "inc", "value" : 0.005},
                    {"probabiliby" : 0.05, "affects" : "assets.studentLoanRate", "method" : "inc", "value" : -0.005}
                ];
                this["questionsAnswered"] = 0;
                this["userAgent"] = userAgent || null;
                this["age"] = null; 
                this["sex"] = null;
                this["studyProgram"] = null;
                this["email"] = null;
                this["salary"] = null;
                this["englishSkills"] = null;
                this["preferredMedia"] = [];
};

