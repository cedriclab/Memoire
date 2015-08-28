exports.get = function(request, response){
	var data = '<DOCTYPE html><html><head></head><body><p>Le lien '+request.query.link+' est impossible à charger. :/</p></body></html>';
	if (request.query.link) {
		var root = request.query.link.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[0];
		var extensionSplit = request.query.link.split(".");
		var extension = extensionSplit.length ? extensionSplit[extensionSplit.length-1] : "";
		console.log(root);
		HTTPRequest(request.query.link, function(error, res, body){
			res.headers["x-frame-options"] = '*';
			if (!error && res.statusCode == 200) {
				body = body.replace('<script src="//cdn.sstatic.net/Js/stub.en.js?v=9a43cf9a0335"></script>', '');
				body = body.replace(/src=\"\//g, 'src="'+root+'/');
				body = body.replace(/href=\"\//g, 'src="'+root+'/');
				
				response.contentType(Boolean(extension=="pdf") ? "application/pdf" : "text/html");
				response.end(body);
			} else {
				response.contentType("text/html");
				response.end(data);
			}
		});
	} else {
		response.contentType("text/html");
		response.end(data);
	}
};