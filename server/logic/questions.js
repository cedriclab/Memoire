exports.getAll = function(request, response){
	response.contentType("application/json");
	response.send({questions : Data["questions"][request.query.section] || []});
};

exports.get = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
};

exports.update = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
};

exports.create = function(request, response){
	response.contentType("application/json");
	response.send({id : request.body.id || (Math.random()*(Math.pow(2,32))).toString(16)});
};