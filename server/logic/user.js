exports.get = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
};

exports.getScore = function(request, response){
	response.contentType("application/json");
	response.send({score : (Math.random()*5000).toFixed(2)});
};

exports.update = function(request, response){
	console.log("UPDATE");
	console.log(request.body);
	console.log(" ");
	response.contentType("application/json");
	response.send({id : request.params.id});
};

exports.create = function(request, response){
	console.log("CREATE");
	console.log(request.cookies);
	console.log(request.body);
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
		var warmupQuestions = Data["questions"]["warmup"].map(function(q){
					q.id = new ObjectID();
					awq.push({"id" : q.id, "begunOn" : null, "answeredOn" : null, "answer" : null});
					return q;
				});
		var gameQuestions = Data["questions"]["game"].map(function(q){
					q.id = new ObjectID();
					if (q.resources) {
						q.resources.forEach(function(r, i){
							r.id = String(i+1);
						})
					}
					agq.push({"id" : q.id, "begunOn" : null, "answeredOn" : null, "answer" : null, "usedResources" : [], "instantImpact" : 0, "recurringImpact" : 0});
					return q;
				});

		MongoClient.connect(DBConnectionString, function(err, db) {
			var _id = new ObjectID();
			db.collection("users").insert({
				"_id" : _id, 
				"timeLoggedIn" : now, 
				"warmupQuestions" : warmupQuestions, 
				"gameQuestions" : gameQuestions, 
				"answeredWarmupQuestions" : awq,
				"answeredGameQuestions" : agq,
				"personalQuestions" : Data["questions"]["personal"].map(function(q){
					q.id = new ObjectID();
					q.begunOn = null;
					q.answeredOn = null;
					q.answer = null;
					return q;
				}), 
				"balance" : startBalance,
				"recurringInflux" : {
					"rent" : -650,
					"food" : -400,
					"fun" : -200,
					"phone" : -50,
					"catFood" : -20,
					"other" : -200,
					"salary" : 0
				},
				"assets" : {
					"hourlyRate" : 20,
					"workStatus" : 50
				},
				"recurringRandom" : [],
				"age" : null, 
				"sex" : null, 
				"studyProgram" : null, 
				"email" : null,
				"salary" : null,
				"englishSkills" : null,
				"preferredMedia" : []
			}, function(){
				db.close();
				response.contentType("application/json");
				response.send({"id" : _id, "balance" : startBalance});
			});
		});
	}
	
};