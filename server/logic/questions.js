exports.getAll = function(request, response){
	var _id = new ObjectID(request.cookies.id);
	var attr = String(request.query.section+"Questions");
	var attrs = {};
	attrs[attr] = 1;
	MongoClient.connect(DBConnectionString, function(err, db) {
		var _id = new ObjectID(request.cookies.id);
		db.collection("users").find({"_id" : _id}, attrs).toArray(function(error, cursorArray){
			db.close();
			response.contentType("application/json");
			response.send({questions : cursorArray[0][attr] || []});
		});
	});
};

exports.get = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
};

exports.update = function(request, response){
	var data = {};
	var query = {};
	var _id = new ObjectID(request.cookies.id);
	query["_id"] = _id;

	MongoClient.connect(DBConnectionString, function(err, db) {
		db.collection("users").find(query).toArray(function(error, users){

			var user = users[0];

			var instantImpact = 0;
			var recurringImpact = 0;
			var previousBalance = Number(user.balance || 0);
			var newCondition;

			if (request.body.section=="warmup") {
				query["answeredWarmupQuestions.id"] = new ObjectID(request.params.id);
				data["answeredWarmupQuestions.$.answer"] = request.body.answer || null;
				data["answeredWarmupQuestions.$.answeredOn"] = Date.now();
			} else if (request.body.section=="game") {
				query["answeredGameQuestions.id"] = new ObjectID(request.params.id);
				data["answeredGameQuestions.$.answer"] = request.body.answer || null;
				data["answeredGameQuestions.$.answeredOn"] = Date.now();

				var effect = Application.questions.getEffect(request.body.index, data["answeredGameQuestions.$.answer"], user);
				if (effect) {
					instantImpact = effect.instantImpact;
					recurringImpact = effect.recurringImpact;
				}

				data["answeredGameQuestions.$.instantImpact"] = instantImpact;
				data["answeredGameQuestions.$.recurringImpact"] = recurringImpact;
				data["answeredGameQuestions.$.previousBalance"] = previousBalance;
			} else if (request.body.personalInfo) {
				var userAttrDict = {
					"1" : {"attribute" : "age", "parser" : function(value){return parseInt(value || 0) || null;}},
					"2" : {"attribute" : "sex",  "parser" : function(value){return value;}},
					"3" : {"attribute" : "studyProgram", "parser" : function(value){return value;}},
					"4" : {"attribute" : "email", "parser" : function(value){return value;}},
					"5" : {"attribute" : "salary", "parser" : function(value){return parseInt(value || 0) || null;}},
					"6" : {"attribute" : "englishSkills", "parser" : function(value){return parseInt(value || 0) || null;}},
					"7" : {"attribute" : "preferredMedia", "parser" : function(value){return value;}}
				};
                request.body.personalInfo.forEach(function(info){
                    var q = userAttrDict[info.key];
                    if (q) {
                        data[q.attribute] = q.parser(info.value);
                    }
                });
			}
	
			db.collection("users").updateOne(query, {$set : data, $inc : {"questionsAnswered" : (request.body.section=="game" ? 1 : 0)}}, function(error){
                db.close();
                response.contentType("application/json");
                request.body.balance = (user.balance || 0);
				if (request.body.section=="game") {
                    var newBalance = 0;
                    try {
                        newBalance = Application.user.playTurn(user, instantImpact, null, true);
                        if (request.body.index=="7") {
                            var meanDelta = (Math.max((newBalance - 5000)/(user.questionsAnswered+1), 0)*0.9).toFixed(2);
                            request.body.additionalInfo = {"key" : "meanDelta", "value" : meanDelta};
                        }
                    } catch (e) {
                        console.log(e);
                    }
					request.body.balance = newBalance.toFixed(2);
                     
				} 
                response.send(request.body);
			}.bind(this));
		}.bind(this));	
	}.bind(this));
	
};

exports.begin = function(request, response){
	var data = {};
	var query = {};
	var _id = new ObjectID(request.cookies.id);
	query["_id"] = _id;
	if (request.body.section=="warmup") {
		var attrTime = "answeredGameQuestions.$.begunOn";
		query["warmupQuestions.id"] = new ObjectID(request.params.id);
		data[attrTime] = Date.now();
	} else if (request.body.section=="game") {
		var attrTime = "answeredGameQuestions.$.begunOn";
		query["gameQuestions.id"] = new ObjectID(request.params.id);
		data[attrTime] = Date.now();
	} 
	MongoClient.connect(DBConnectionString, function(err, db) {
		db.collection("users").updateOne(query, {$set : data}, function(error){
			console.log(error);
			db.close();
			response.contentType("application/json");
			response.send({});
		});
	});
};

exports.useLink = function(request, response){
	var data = {};
	var query = {};
	var _id = new ObjectID(request.cookies.id);
	query["_id"] = _id;
	query["gameQuestions.id"] = new ObjectID(request.params.id);
	data["answeredGameQuestions.$.usedResources"] = {"resource" : request.body.linkID, "timeUsed" : Date.now()};

console.log("USE LINK");
	MongoClient.connect(DBConnectionString, function(err, db) {
		db.collection("users").updateOne(query, {$push : data}, function(){
			db.close();
			response.contentType("application/json");
			response.send({});
		});
	});
};

exports.useAdvice = function(request, response){
    var data = {};
	var query = {};
	var _id = new ObjectID(request.cookies.id);
	query["_id"] = _id;
    query["gameQuestions.id"] = new ObjectID(request.params.id);
    data["answeredGameQuestions.$.usedResources"] = {"resource" : "advice", "timeUsed" : Date.now()};

    var advice = Data["advice"][request.query.questionIndex] || {};
    var cost = advice.cost || 0;

	MongoClient.connect(DBConnectionString, function(err, db) {
		db.collection("users").updateOne(query, {$push : data, $inc : {"balance" : Number((-1)*cost)}}, function(error){
            console.log(error);
            db.collection("users").find({"_id" : _id}, {"balance" : 1}).toArray(function(error, cursorArray){
                db.close();
                var user = cursorArray[0] || {};
                console.log(user);
                response.contentType("application/json");
                response.send({"adviceText" : advice.text || "", "newBalance" : (user.balance || null)});
            });    
		});
	});
};

exports.useData = function(request, response){
    var data = {};
	var query = {};
	var _id = new ObjectID(request.cookies.id);
	query["_id"] = _id;
    query["gameQuestions.id"] = new ObjectID(request.params.id);
    data["answeredGameQuestions.$.usedResources"] = {"resource" : "rawData", "timeUsed" : Date.now()};
    
console.log("USE DATA");
	MongoClient.connect(DBConnectionString, function(err, db) {
		db.collection("users").updateOne(query, {$push : data}, function(){
			db.close();
			response.contentType("application/json");
			response.send({});
		});
	});
};

exports.create = function(request, response){
	response.contentType("application/json");
	response.send({id : request.body.id || (Math.random()*(Math.pow(2,32))).toString(16)});
};

exports.getEffect = function(questionID, answer, userData){
	var impact = Data.impacts[questionID];
	var thisImpact = {"instantImpact" : 0, "recurringImpact" : 0};
	if (impact) {
		if (answer===null) {
			return impact.worst;
		}
		if (typeof(impact.result)=="function") {
			return impact.result(answer, userData);
		} else if (typeof(impact.result)=="object") {
			return impact.result[answer] || thisImpact;
		}
	} 
	return thisImpact;
};