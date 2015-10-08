exports.getAll = function(request, response){
	var _id = new ObjectID(request.cookies.id);
	var attr = String(request.query.section+"Questions");
	var attrs = {};
	attrs[attr] = 1;
	MongoClient.connect(DBConnectionString, function(err, db) {
		var _id = new ObjectID(request.cookies.id);
		db.collection("users").find({"_id" : _id}, attrs).toArray(function(error, cursorArray){
			console.log(cursorArray);
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
			} else if (request.body.section=="personal") {
				var userAttrDict = {
					"1" : {"attribute" : "age", "parser" : function(value){return parseInt(value || 0) || null;}},
					"2" : {"attribute" : "sex",  "parser" : function(value){return value;}},
					"3" : {"attribute" : "studyProgram", "parser" : function(value){return value;}},
					"4" : {"attribute" : "email", "parser" : function(value){return value;}},
					"5" : {"attribute" : "salary", "parser" : function(value){return parseInt(value || 0) || null;}},
					"6" : {"attribute" : "englishSkills", "parser" : function(value){return parseInt(value || 0) || null;}},
					"7" : {"attribute" : "preferredMedia", "parser" : function(value){return value;}}
				};
				var q = userAttrDict[request.body.index];
				if (q) {
					data[q.attribute] = q.parser(request.body.answer);
				}
			}
	
			db.collection("users").updateOne(query, {$set : data}, function(error){
				console.log(error);
				if (request.body.section=="game") {
					

					var mover = instantImpact;
				/*	
					(user.answeredGameQuestions || []).forEach(function(q){
						mover += q.recurringImpact;
					});
				*/	
					(user.recurringRandom || []).forEach(function(item){
						if (Math.random() < item.probability) {
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
					var recurringInflux = user.recurringInflux || {};
					Object.keys(recurringInflux).forEach(function(condition){
						if (recurringInflux[condition]) {
							mover += recurringInflux[condition];
						}
					});
					
					var newBalance = (user.balance || 0) + mover;

					db.collection("users").updateOne({"_id" : _id}, {$set : {"balance" : newBalance, "assets" : user.assets, "recurringInflux" : user.recurringInflux, "recurringRandom" : user.recurringRandom}}, function(error){
						db.close();
					});

					response.contentType("application/json");
					request.body.balance = newBalance.toFixed(2);
					response.send(request.body);
				} else {
					db.close();
					response.contentType("application/json");
					request.body.balance = (user.balance || 0);
					response.send(request.body);
				}
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
console.log("BEGIN");
console.log(query);
console.log(data);
console.log(" ");
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
	if (request.body.section=="game") {
		var attrTime = "answeredGameQuestions.$.usedResources";
		query["gameQuestions.id"] = new ObjectID(request.params.id);
		data[attrTime] = {"linkID" : request.body.linkID, "timeUsed" : Date.now()};
	} 
console.log("USE LINK");
console.log(query);
console.log(data);
console.log(" ");
	MongoClient.connect(DBConnectionString, function(err, db) {
		db.collection("users").updateOne(query, {$addToSet : data}, function(){
			db.close();
			response.contentType("application/json");
			response.send({});
		});
	});
};

exports.useAdvice = function(request, response){

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