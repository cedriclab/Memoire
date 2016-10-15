db = (new Mongo()).getDB("memoire_testrun");
var basicValues = ["_id", "age", "sex", "studyProgram", "salary", "englishSkills", "userAgent"];

var QUESTION_COUNT = 16;
var userCount = 0;

var cleans = [];
var warmupQuestions = [];
var gameQuestions = [];
/*
for (var i=0; i<3; i++) {

}
*/
for (var i=0; i<QUESTION_COUNT; i++) {
	gameQuestions.push({
		"index" : (i+1), 
		"resourceCount" : 0,
		"hasData" : false,
		"hasAdvice" : false,
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

var userIndex = 0;

db.users.find({$or : [{"ignore" : {$exists : false}}, {"ignore" : {$ne : true}}]}).forEach(function(user){

	if (!userIndex++) {
		var qui = 0;
		user["answeredGameQuestions"].forEach(function(q){
			if (q.answeredOn) {
				var properQuestion = getQuestion(user["gameQuestions"], q);
				gameQuestions[qui]["resourceCount"] = (properQuestion.resources || []).length;
				gameQuestions[qui]["hasAdvice"] = true;
				if (properQuestion.rawData) {
					gameQuestions[qui]["hasData"] = true;
				}
				qui++;
			}
		});
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

/*
var qTimes = [];
var rUsed = [];
for (var i=0; i<QUESTION_COUNT; i++) {
	var times = [];
	var ru = [];
	cleans.forEach(function(u){
		times.push(u.gameTime[i] || 0);
		qTimes.push((u.gameTime[i] || 0)/1000);

		ru.push(u.resourcesUsed[i] || 0);
		rUsed.push(u.resourcesUsed[i] || 0);
	});
	var qTime = mean(times)/1000;
	//print(times);
	print("Mean time for Question "+String(i+1)+" is : "+qTime.toFixed(2)+" seconds, with an average "+mean(ru).toFixed(2)+" resources used.");
}
print("Mean time for all questions is : "+mean(qTimes).toFixed(2)+" seconds.");
print("Standard deviation of answer times is : "+Math.sqrt(variance(qTimes)).toFixed(2)+" seconds.");

print("Mean used resources count for all questions is : "+mean(rUsed).toFixed(2)+";");
print("Standard deviation for resources count is : "+Math.sqrt(variance(rUsed)).toFixed(2)+";");
*/

