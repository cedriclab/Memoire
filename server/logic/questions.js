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
	console.log(request.body);
	console.log(request.cookies);

	var data = {};
	if (request.body.section=="warmup") {
		var attr = "warmupQuestions."+String(parseInt(request.body.index)-1)+".answer";
		data[attr] = request.body.answer || null;
	} else if (request.body.section=="game") {
		var attr = "gameQuestions."+String(parseInt(request.body.index)-1)+".answer";
		data[attr] = request.body.answer || null;
	} else if (request.body.section=="personal") {
		var userAttrDict = {
			"1" : {"attribute" : "age", "parser" : function(value){return value;}},
			"2" : {"attribute" : "sex",  "parser" : function(value){return value;}},
			"3" : {"attribute" : "studyProgram", "parser" : function(value){return value;}},
			"4" : {"attribute" : "email", "parser" : function(value){return value;}},
			"5" : {"attribute" : "salary", "parser" : function(value){return value;}},
			"6" : {"attribute" : "englishSkills", "parser" : function(value){return value;}},
			"7" : {"attribute" : "preferredMedia", "parser" : function(value){return value;}}
		};
		var q = userAttrDict[request.body.index];
		if (q) {
			data[q.attribute] = q.parser(request.body.answer);
		}
	}
	console.log(data);
/*
	MongoClient.connect(DBConnectionString, function(err, db) {
		var _id = new ObjectID(request.cookies.id);
		db.collection("users").update({"_id" : _id}, data, function(){
			db.close();
			
		});
	});
*/
	response.contentType("application/json");
	request.body.score = (Math.random()*5000).toFixed(2);
	response.send(request.body);
};

exports.create = function(request, response){
	response.contentType("application/json");
	response.send({id : request.body.id || (Math.random()*(Math.pow(2,32))).toString(16)});
};