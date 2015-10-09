exports.routes = [
	{"method" : "GET", "path" : "/user/:id", "section" : "user", "calls" : "get"},
	{"method" : "GET", "path" : "/user/score/:id", "section" : "user", "calls" : "getScore"},
	{"method" : "PUT", "path" : "/user/:id", "section" : "user", "calls" : "update"},
	{"method" : "POST", "path" : "/user", "section" : "user", "calls" : "create"},

	{"method" : "GET", "path" : "/questions", "section" : "questions", "calls" : "getAll"},
	{"method" : "GET", "path" : "/question/:id", "section" : "questions", "calls" : "get"},
	{"method" : "PUT", "path" : "/question/:id", "section" : "questions", "calls" : "update"},
	{"method" : "PUT", "path" : "/question/resource/:id", "section" : "questions", "calls" : "useLink"},
	{"method" : "GET", "path" : "/question/advice/:id", "section" : "questions", "calls" : "useAdvice"},
    {"method" : "PUT", "path" : "/question/data/:id", "section" : "questions", "calls" : "useData"},
	{"method" : "PUT", "path" : "/question/begin/:id", "section" : "questions", "calls" : "begin"},
	{"method" : "POST", "path" : "/question", "section" : "questions", "calls" : "create"},
    
    {"method" : "GET", "path" : "/results", "section" : "user", "calls" : "getResults"},
	
	//{"method" : "GET", "path" : "/resource", "section" : "resources", "calls" : "get"},
];