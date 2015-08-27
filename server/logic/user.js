exports.get = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
};

exports.update = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
};

exports.create = function(request, response){
	var body = request.body || {};
	console.log(request.cookies);
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