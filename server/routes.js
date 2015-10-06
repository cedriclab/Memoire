exports.routes = [
	{"method" : "GET", "path" : "/user/:id", "section" : "user", "calls" : "get"},
	{"method" : "GET", "path" : "/user/score/:id", "section" : "user", "calls" : "getScore"},
	{"method" : "PUT", "path" : "/user/:id", "section" : "user", "calls" : "update"},
	{"method" : "POST", "path" : "/user", "section" : "user", "calls" : "create"},

	{"method" : "GET", "path" : "/questions", "section" : "questions", "calls" : "getAll"},
	{"method" : "GET", "path" : "/question/:id", "section" : "questions", "calls" : "get"},
	{"method" : "PUT", "path" : "/question/:id", "section" : "questions", "calls" : "update"},
	{"method" : "POST", "path" : "/question", "section" : "questions", "calls" : "create"},
	
	{"method" : "GET", "path" : "/resource", "section" : "resources", "calls" : "get"},
];