exports.get = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
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
	
	var data;
	if (Object.keys(body).length) {
		data = body;
	} else {
		/*MongoClient.connect(DBConnectionString, function(err, db) {
			db.collection("users").insert({});
		});*/
		data = {id : "123"}
	}
	response.contentType("application/json");
	response.send(data);
};