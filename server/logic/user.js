exports.get = function(request, response){
	response.contentType("application/json");
	response.send({id : request.params.id});
};