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
	
	var data;
	if (Object.keys(body).length) {
		response.contentType("application/json");
		response.send(data);
	} else {
		MongoClient.connect(DBConnectionString, function(err, db) {
			var _id = new ObjectID();
			db.collection("users").insert({
				"_id" : _id, 
				"timeLoggedIn" : now, 
				"warmupQuestions" : Data["questions"]["warmup"].map(function(q){
					q.id = new ObjectID();
					q.begunOn = null;
					q.answeredOn = null;
					q.answer = null;
					return q;
				}), 
				"gameQuestions" : Data["questions"]["game"].map(function(q){
					q.id = new ObjectID();
					q.usedResources = [];
					q.begunOn = null;
					q.answeredOn = null;
					q.answer = null;
					return q;
				}), 
				"personalQuestions" : Data["questions"]["personal"].map(function(q){
					q.id = new ObjectID();
					q.begunOn = null;
					q.answeredOn = null;
					q.answer = null;
					return q;
				}), 
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
				response.send({"id" : _id});
			});
		});
	}
	
};