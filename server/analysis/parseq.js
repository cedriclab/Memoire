/*db = (new Mongo()).getDB("memoirecedric");
var basicValues = ["_id", "age", "sex", "studyProgram", "salary", "englishSkills", "userAgent"];

var QUESTION_COUNT = 12;
var userCount = 0;

var cleans = [];
var warmupQuestions = [];
var gameQuestions = [];

var mean = function(vector){
	if (vector.length) {
		var sum = 0;
		vector.forEach(function(vi){sum += vi;});
		return sum/vector.length;
	}
	return 0;
};
var variance = function(vector, m){
	if (vector.length) {
		m = m || mean(vector);
		var sum = 0;
		vector.forEach(function(vi){sum += ((vi-m)*(vi-m));});
		return sum/vector.length;
	}
	return 0;
};
var mode = function(vector){
	var dict = {};
	var mo = {"value" : null, "count" : 0};
	if (vector.length) {
		vector.forEach(function(a){
			if (typeof(a)=="string") {
				if (!dict[a]) {
					dict[a]=1;
				} else {
					dict[a]++;
				}
			}
		});
		var answers = Object.keys(dict);
		if (answers.length) {
			answers.forEach(function(a){
				if (dict[a] > mo.count) {
					mo = {"value" : a, "count" : dict[a]};
				}
			});
		}
	};
	return mo;
};
var printVar = function(vector, name){
	var m = mean(vector);
	print((name || "Variable")+" = [mean: "+m+"] [Std.Dev: "+Math.sqrt(variance(vector, m))+"]");
};

var getQuestion = function(questions, answer){
	for (var j=0; j<questions.length; j++){
		if (questions[j].id.valueOf()===answer.id.valueOf()) {
			return questions[j];
		}
	}
	return null;
};

for (var i=0; i<QUESTION_COUNT; i++) {
	gameQuestions.push({
		"index" : (i+1), 
		"resourceCount" : 0,
		"hasData" : false,
		"hasAdvice" : false,
		"optionsCount" : null,
		"timeSpent" : [],
		"resourcesUsed" : [],
		"answers" : [],
		"adviceUsed" : 0,
		"dataUsed" : 0,
		"meanTimeSpent" : 0,
		"timeSpentStdDev" : 0,
		"meanUsedResourceCount" : 0,
		"usedResourceCountStdDev" : 0,
		"meanUsedAdvice" : 0,
		"meanUsedData" : 0,
		"mostPopularAnswer" : null,
		"mostPopularAnswerPopularity" : 0,
		"stake" : 0
	});
}

var userIndex = 0;
var qSet = false;

db.users.find({$or : [{"ignore" : {$exists : false}}, {"ignore" : {$ne : true}}]}).forEach(function(user){

	var qAnswered = user["answeredGameQuestions"].map(function(q){return Number(Boolean(q.answeredOn));}).reduce(function(a,b){return a+b;});

	if (qAnswered < 13) {
		userIndex++;
		if (!qSet && qAnswered==12) {
			var qui = 0;
			user["answeredGameQuestions"].forEach(function(q){
				if (q.answeredOn) {
					var properQuestion = getQuestion(user["gameQuestions"], q);
					gameQuestions[qui]["resourceCount"] = (properQuestion.resources || []).length;
					gameQuestions[qui]["hasAdvice"] = true;
					if (properQuestion.rawData) {
						gameQuestions[qui]["hasData"] = true;
					}
					gameQuestions[qui]["optionsCount"] = (properQuestion.options || []).length-Number(gameQuestions[qui]["hasAdvice"])-Number(gameQuestions[qui]["hasData"]);
					qui++;
				}
			});
			qSet = true;
		}

		var clean = {};
		basicValues.forEach(function(key){
			clean[key] = user[key];
		});
		clean["warmupTime"] = [];
		clean["gameTime"] = [];
		clean["resourcesUsed"] = [];

		var startTime = Number(user["timeLoggedIn"]);
		var timeBase = user["timeLoggedIn"];
		user["answeredWarmupQuestions"].forEach(function(q){
			if (q.answeredOn) {
				clean["warmupTime"].push(q.answeredOn-timeBase);
				timeBase = q.answeredOn;
			}
		});
		clean["warmupTotalTime"] = timeBase-startTime;
		var gameStartTime = Number(timeBase);
		var qui = 0;
		user["answeredGameQuestions"].forEach(function(q, qi){
			if (q.answeredOn) {
				var usedResources = 0;
				(q.usedResources || []).forEach(function(r){
					if (r.resource=="advice") {
						gameQuestions[qui].adviceUsed++;
					} else if (r.resource=="rawData") {
						gameQuestions[qui].dataUsed++;
					} else {
						usedResources++;
					}
				});
				gameQuestions[qui].answers.push(q.answer);
				gameQuestions[qui].resourcesUsed.push(usedResources);
				gameQuestions[qui].timeSpent.push(q.answeredOn-timeBase);
				timeBase = q.answeredOn;
				qui++;
			}
		});
		clean["gameTotalTime"] = timeBase-gameStartTime;

		//printjson(clean);
		cleans.push(clean);
	}
});

userCount = cleans.length;

gameQuestions.forEach(function(question){
	question["meanTimeSpent"] = mean(question.timeSpent);
	question["meanUsedResourceCount"] = mean(question.resourcesUsed);
	question["meanUsedResourceProportion"] = question.resourceCount ? question["meanUsedResourceCount"]/question.resourceCount : 0;
	question["meanUsedAdvice"] = question.adviceUsed/userCount;
	question["meanUsedData"] = question.dataUsed/userCount;
	question["timeSpentStdDev"] = Math.sqrt(variance(question.timeSpent), question["meanTimeSpent"]);
	question["usedResourceCountStdDev"] = Math.sqrt(variance(question.resourcesUsed), question["meanUsedResourceCount"]);

	var mod = mode(question["answers"]);
	question["mostPopularAnswer"] = mod.value,
	question["mostPopularAnswerPopularity"] = mod.count/userCount;

	delete question.timeSpent;
	delete question.resourcesUsed;
	delete question.answers;

	printjson(question);
	//printjson(mod);
});

print("N : "+userCount);
*/

db = (new Mongo()).getDB("memoire_manips");
var questionIndices = [1,2,4,5,6,8,10,11,12,17,19,20];

db.users.find().forEach(function(user){
	print(user.email);
	db.users.update({"_id" : user._id}, {$set : {"answers" : questionIndices.map(function(i){return user.answeredGameQuestions[i-1]})}});
});

print("done");