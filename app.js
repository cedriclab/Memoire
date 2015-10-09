Application = {};
Data = {};
Data["questions"] = require("./server/data/questions.js");
Data["impacts"] = require("./server/data/impacts.js");
Data["advice"] = require("./server/data/advice.js");
Data["randoms"] = {"recurring" : []};
for (var i=0; i<60; i++) {
    Data["randoms"]["recurring"][i] = [];
}

var randomVariables = ["gasUp", "gasDown", "caughtMeetingRecruiter", "winTicketContest", "carProblemSeverity"];
randomVariables.forEach(function(variable){
  Data["randoms"][variable] = Math.random();
});


Data["questions"].forEach(function(question){
	if (!Data["questions"][question.section]) {
		Data["questions"][question.section] = [];
	}
	Data["questions"][question.section].push(question);
});

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var http = require("http");

HTTPRequest = require("request");

//var routes = require('./routes/index');
var routes = require('./server/routes.js');

var app = express();
app.set("port", 3000);

MongoDB = require('mongodb');
DBConnectionString = "mongodb://localhost:27017/memoire";
MongoClient = MongoDB.MongoClient;
ObjectID = MongoDB.ObjectID;
assert = require("assert");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

routes.routes.forEach(function(route){
	if (!Application[route.section]) {
		Application[route.section] = require("./server/logic/"+route.section+".js");
	}
	app[route.method.toLowerCase()](route.path, Application[route.section][route.calls]);
});

http.createServer(app).listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;
