var QUESTION_ORDER = [1,2,4,5,6,8,10,11,12,17,19,20];
var qs = require("../data/questions.js").filter(function(q){
	return q.section=="game";
});
var questions = QUESTION_ORDER.map(function(qo){
	return qs[qo-1];
});

var MongoDB = require('mongodb');
var DBConnectionString = "mongodb://localhost:27017/memoire_manips";
var MongoClient = MongoDB.MongoClient;

function prepareFor(questionIndex, currentCombinations) {
	console.log("Called for question", questionIndex, "with combinations of size", currentCombinations.length);
	
	if (questionIndex == questions.length) {
		return currentCombinations;
	}

	var question = questions[questionIndex];
	var answers = question.options ? question.options : [{id:0}, {id:1}]; //TODO : parse fields for text questions
	var localCombinations = [];
	
	if (questionIndex) {
		for (var i=0; i<currentCombinations.length; i++) {
			for (var j=0; j<answers.length; j++) {
				var combi = currentCombinations[i].slice(0);
				combi.push(parseInt(answers[j].id));
				localCombinations.push(combi);
			}
		}
	} else {
		for (var j=0; j<answers.length; j++) {
			localCombinations[j] = [parseInt(answers[j].id)];
		}
	}

	return prepareFor(questionIndex+1, localCombinations);
}

var combinations = prepareFor(0, []).map(function(combination){
	return {
		"combination" : combination, 
		"oneYearOutcome" : 0, 
		"fiveYearsOutcome" : 0
	};
});

console.log("Done with", combinations.length, "combinations.");

MongoClient.connect(DBConnectionString, function(err, db) {
	db.collection("answer_combinations").insertMany(combinations, function(err, result){
		console.log("Done.");
	});
});