var AVERAGE_WORDS_PER_SECOND = 3.33;
var TURNS_PLAYED = 12;
var TOTAL_TURNS = 60;
var RESOURCE_USED_THRESHOLD = 8000;
var RAW_DATA_EFFORT_WEIGHT = 1.5;
var MINIMUM_WAGE = 10.55;

var MILISECONDS_PER_HOUR = 3600000;
var GAME_STAKE_MAX = 30;
var GAME_STAKE_MIN = 10;
var GAME_STAKE_MEAN = GAME_STAKE_MIN+((GAME_STAKE_MAX-GAME_STAKE_MIN)/2);
var MEAN_TIME_FOR_QUESTION = MILISECONDS_PER_HOUR/24;

var QUESTION_ORDER = [1,2,4,5,6,8,10,11,12,17,19,20];
var RISKY_CHOICES = [0, 0, 0];

var MATH_SKILLS = {
	"econ" : 8,
	"mark" : 3,
	"admin" : 3,
	"grh" : 3,
	"compta" : 8,
	"finance" : 8,
	"math" : 10,
	"psy" : 3,
	"autre" : 5
};

var empiricalAverageWordPerSecond;

var MongoDB = require('mongodb');
var DBConnectionString = "mongodb://localhost:27017/memoire_manips";
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;

var addedCategories = ["suggestion", "complexity", "wordCount", "governmentSource", "sourceId", "language", "isDubious"];

var additionalDataHash = {};
var questionSuggestions = require("./suggestion.js");
var adviceData = require("../data/advice.js");
var rawQuestions = require("../data/questions.js");
var warmupLengths = [0, 0, 0];

var allResources = [];
var allResourcesKeys = {};
var normalizedResources = [];

var allQuestions = [];
var allQuestionsKeys = {};
var normalizedQuestions = [];

var prefixify = function(prefix, word){
	return prefix + word[0].toUpperCase() + word.substring(1);
};
var userAttributesToKeep = ["_id", "balance", "resourceTrustIndex", "riskAversionIndex", "gullibilityIndex", "skillIndex", "mathSkillIndex", "fieldOfStudy", "englishSkills", "articlesRead", "rawDataUsed", "adviceUsed", "dubiousArticlesRead", "dubiousArticlesHeeded", "trustedArticlesRead", "trustedArticlesHeeded", "adviceAdvicesHeeded", "totalResourcesUsed", "resourceTrustIndex", "totalResourcesUsed"];
var questionAttributesToKeep = ["index", "timeSpent", "rightAnswer", "stake", "percievedStake", "effort", "effortBase", "effortCostSalary", "effortCostBonus"];

var countQuestionWords = function(q){
	return q.text.split(" ").length + (q.options ? q.options.reduce(function(a, b){
		return a + b.text.split(" ").length;
	}, 0) : 0) + (q.resources ? q.resources.reduce(function(a, b){
		return a + b.title.split(" ").length + b.sample.split(" ").length;
	}, 0) : 0);
};
console.log(rawQuestions.length);

questionSuggestions.forEach(function(q, qi){
	additionalDataHash[q.index] = q;
	var rawQuestion = rawQuestions[QUESTION_ORDER[qi]+2];
	q["questionWordCount"] = countQuestionWords(rawQuestion);
});

console.log(Object.keys(additionalDataHash));

var warmupLengths = [0, 0, 0].map(function(n, i){
	return countQuestionWords(rawQuestions[i]);
});

var runAnalysis = function(users, callback) {
	
	var errors = [];
	var userWordsPerSecond = [];
	
	users.forEach(function(user){
		try {
			var wordsPerSecond = [];
			var answeredGameQuestions = QUESTION_ORDER.map(function(qIndex){
				var answeredQuestion = user.answeredGameQuestions[qIndex-1];
				var additionalData = additionalDataHash[String(answeredQuestion.index+1)];

				answeredQuestion["timeSpent"] = answeredQuestion.answeredOn - answeredQuestion.begunOn;
				answeredQuestion["timeBeforeFirstResource"] = 0;
				if (answeredQuestion.usedResources.length) {
					var t = answeredQuestion.usedResources[0].timeUsed - answeredQuestion.begunOn;
					answeredQuestion["timeBeforeFirstResource"] = t;
					wordsPerSecond.push(additionalData.questionWordCount*1000 / t);
				}
			});
			
			user["wordsPerSecond"] = wordsPerSecond.length ? wordsPerSecond.reduce(function(a, b){return a + b;}, 0)/wordsPerSecond.length : null;
			if (user["wordsPerSecond"]) {
				userWordsPerSecond.push(user["wordsPerSecond"]);
			}
			
			user["riskAversionIndex"] = 0;
			user.answeredWarmupQuestions.forEach(function(warmupQuestion, wqi){
				if (parseInt(warmupQuestion.answer)-1 != RISKY_CHOICES[wqi]) {
					user.riskAversionIndex += 1; 
				}
			});
			user.riskAversionIndex = user.riskAversionIndex/3
		} catch (e) {
			console.log(e);
		}
	});
	
	empiricalAverageWordPerSecond = userWordsPerSecond.length ? userWordsPerSecond.reduce(function(a, b){return a + b;}, 0)/userWordsPerSecond.length : null;
	
	users.forEach(function(user){
		try {
			var linksClicked = [];
			
			var articlesRead = 0;
			var rawDataUsed = 0;
			var adviceUsed = 0;
			var dubiousArticlesRead = 0;
			var dubiousArticlesHeeded = 0;
			var trustedArticlesRead = 0;
			var trustedArticlesHeeded = 0;
			var resourceAdvicesHeeded = 0;
			var adviceAdvicesHeeded = 0;
			var totalResourcesUsed = 0;
			
			var rightAnswers = 0;

			var answeredGameQuestions = QUESTION_ORDER.map(function(qIndex){
				var answeredQuestion = user.answeredGameQuestions[qIndex-1];
				var additionalData = additionalDataHash[String(answeredQuestion.index+1)];
				
				var localAviceData = adviceData[String(qIndex)];

				answeredQuestion["articlesRead"] = 0;
				answeredQuestion["rawDataUsed"] = 0;
				answeredQuestion["adviceUsed"] = 0;
				answeredQuestion["dubiousArticlesRead"] = 0;
				answeredQuestion["dubiousArticlesHeeded"] = 0;
				answeredQuestion["trustedArticlesRead"] = 0;
				answeredQuestion["trustedArticlesHeeded"] = 0;
				answeredQuestion["heededResourceAdvice"] = false;
				answeredQuestion["heededAdviceAdvice"] = false;
				
				answeredQuestion["rightAnswer"] = false;
				if (localAviceData.heedCheck) {
					answeredQuestion["rightAnswer"] = localAviceData.heedCheck(answeredQuestion);
				} else if (localAviceData.suggestion !== undefined) {
					answeredQuestion["rightAnswer"] = answeredQuestion.answer==String(localAviceData.suggestion+1);
				}
				
				if (answeredQuestion["rightAnswer"]) {
					rightAnswers++;
				}

				answeredQuestion.usedResources.forEach(function(resource, rIndex){
					
					totalResourcesUsed++;

					if (rIndex != answeredQuestion.usedResources.length-1) {
						resource["timeSpent"] = answeredQuestion.usedResources[rIndex+1].timeUsed - resource.timeUsed;
					} else {
						resource["timeSpent"] = answeredQuestion.answeredOn - resource.timeUsed;
					}

					if (typeof(resource.resource) == "number") {
						articlesRead++;
						answeredQuestion["articlesRead"] += 1;
						var resourceInfo = additionalData.resources[resource.resource-1];
						addedCategories.forEach(function(key){
							resource[key] = resourceInfo[key];
						});
						resource["linkUsedBefore"] = linksClicked.indexOf(resourceInfo.link) != -1;
						linksClicked.push(resourceInfo.link);
						resource["linkFamiliar"] = resourceInfo.sourceId ? user.preferredMedia.indexOf(parseInt(resourceInfo.sourceId)) : false;
						
						resource["isTrusted"] = resource["linkUsedBefore"] || resource["linkFamiliar"] || resource["governmentSource"];
						if (resource["isTrusted"] && resource["timeSpent"] > RESOURCE_USED_THRESHOLD) {
							answeredQuestion["trustedArticlesRead"] += 1;
							if (resource["heededAdvice"]) {
								answeredQuestion["trustedArticlesHeeded"] += 1;
							}
						}
						
						if (resource["isDubious"] && resource["timeSpent"] > RESOURCE_USED_THRESHOLD) {
							answeredQuestion["dubiousArticlesRead"] += 1;
							if (resource["heededAdvice"]) {
								answeredQuestion["dubiousArticlesHeeded"] += 1;
							}
						}
						
						resource["heededAdvice"] = resource.suggestion ? answeredQuestion.answer==String(resource.suggestion+1) : null;
						
					} else if (resource.resource=="advice") {
						adviceUsed++;
						answeredQuestion["adviceUsed"] += 1;
			
						resource["amountSpent"] = localAviceData.cost;
						resource["suggestion"] = localAviceData.suggestion;

						resource["heededAdvice"] = answeredQuestion["rightAnswer"];
						answeredQuestion["heededAdviceAdvice"] = answeredQuestion["rightAnswer"];
					} else {
						rawDataUsed++;
						answeredQuestion["rawDataUsed"] += 1;
					}
					
					if (resource["heededAdvice"]) {
						answeredQuestion["heededResourceAdvice"] = true;
					}

				});
				
				dubiousArticlesRead += answeredQuestion["dubiousArticlesRead"];
				dubiousArticlesHeeded += answeredQuestion["dubiousArticlesHeeded"];
				trustedArticlesRead += answeredQuestion["trustedArticlesRead"];
				trustedArticlesHeeded += answeredQuestion["trustedArticlesHeeded"];
				
				if (answeredQuestion["heededResourceAdvice"]) {
					resourceAdvicesHeeded++;
				}
				
				answeredQuestion["stake"] = typeof(additionalData["stake"])==="function" ? additionalData.stake(user, answeredQuestion.answer) : additionalData["stake"];
				answeredQuestion["percievedStake"] = typeof(additionalData["percievedStake"])==="function" ? additionalData.percievedStake(user, answeredQuestion.answer) : additionalData["percievedStake"];
				
				return answeredQuestion;
			});

			user["wordsPerSecond"] = user["wordsPerSecond"] || empiricalAverageWordPerSecond;
			user["rightAnswers"] = rightAnswers;
			
			user["mathSkillIndex"] = (MATH_SKILLS[user.fieldOfStudy] || 10)/10;
			user["skillIndex"] = (user["mathSkillIndex"] + ((user.englishSkills || 10)/10) + (user["wordsPerSecond"]/empiricalAverageWordPerSecond) + (rightAnswers/12))/4; 
			
			user["articlesRead"] = articlesRead;
			user["rawDataUsed"] = rawDataUsed;
			user["adviceUsed"] = adviceUsed;
			user["dubiousArticlesRead"] = dubiousArticlesRead;
			user["dubiousArticlesHeeded"] = dubiousArticlesHeeded;
			user["trustedArticlesRead"] = trustedArticlesRead;
			user["trustedArticlesHeeded"] = trustedArticlesHeeded;
			user["resourceAdvicesHeeded"] = resourceAdvicesHeeded;
			user["adviceAdvicesHeeded"] = adviceAdvicesHeeded;
			user["totalResourcesUsed"] = articlesRead + rawDataUsed + adviceUsed;
			user["resourceTrustIndex"] = user["totalResourcesUsed"] > 0 ? user["resourceAdvicesHeeded"]/user["totalResourcesUsed"] : 0;
			
			user["email"] = null;
			
			var startTime;
			answeredGameQuestions.forEach(function(answeredQuestion, aqi){
				var effortBase = 0, 
					effortCostSalary = 0,
					effortCostBonus = 0;
				if (!aqi) {
					startTime = answeredQuestion.begunOn;
				}
				
				answeredQuestion.usedResources.forEach(function(resource, rIndex){
					resource["wordsRead"] = resource["timeSpent"] * user["wordsPerSecond"];
					if (resource.language=="EN") {
						resource["wordsRead"] = resource["wordsRead"] * (user.englishSkills===null ? 10 : user.englishSkills)/10;
					}
					resource["wordsRead"] = resource["wordsRead"] > resource.wordCount ? resource.wordCount : resource["wordsRead"];
					resource["pctRead"] = resource["wordsRead"]/resource.wordCount;
					
					if (resource.resource=="advice") {
						resource["effortBase"] = resource["timeSpent"];
						resource["effortCostSalary"] = resource["amountSpent"];
						resource["effortCostBonus"] = resource["amountSpent"];
					} else {
						resource["effortBase"] = resource["timeSpent"]*(resource.resource=="rawData" ? user["mathSkillIndex"] : 1) * (1/user["skillIndex"]); 
						resource["effortCostSalary"] = resource["effortBase"]*((user.salary || MINIMUM_WAGE)/MILISECONDS_PER_HOUR);
						resource["effortCostBonus"] = resource["effortBase"]*(GAME_STAKE_MEAN/(MILISECONDS_PER_HOUR/2));
					}
					
					effortBase += resource["effortBase"];
					effortCostSalary += resource["effortCostSalary"];
					effortCostBonus += resource["effortCostBonus"];		
				});
				
				answeredQuestion["effortBase"] = effortBase;
				answeredQuestion["effortCostSalary"] = effortCostSalary;
				answeredQuestion["effortCostBonus"] = effortCostBonus;
				
				answeredQuestion.isLateStart = null;
				answeredQuestion.isLateEnd = null;
				if (aqi) {
					answeredQuestion.isLateStart = (answeredQuestion.begunOn - startTime) > (MEAN_TIME_FOR_QUESTION * aqi);
				}
				answeredQuestion.isLateEnd = (answeredQuestion.answeredOn - startTime) > (MEAN_TIME_FOR_QUESTION * (aqi+1));
				answeredQuestion.isLate = answeredQuestion.isLateStart || answeredQuestion.isLateEnd;
			});
			
			
			answeredGameQuestions.forEach(function(answeredQuestion, aqi){
				
				answeredQuestion.usedResources.forEach(function(resource, rIndex){
					var resourceClone = JSON.parse(JSON.stringify(resource));
					userAttributesToKeep.forEach(function(attr){
						resourceClone[prefixify("user", attr)] = user[attr];
					});
					questionAttributesToKeep.forEach(function(attr){
						resourceClone[prefixify("question", attr)] = answeredQuestion[attr];
					});
					allResources.push(resourceClone);
				});
				
				var questionClone = JSON.parse(JSON.stringify(answeredQuestion));
				userAttributesToKeep.forEach(function(attr){
					questionClone[prefixify("user", attr)] = user[attr];
				});
				questionClone.usedResources = questionClone.usedResources.length;
				allQuestions.push(questionClone);
			});
		} catch (e) {
			errors.push(e);
			console.log(e.stack)
		}
	});		
	
	callback(errors, users);
};

var parseResources = function(){
	allResources.forEach(function(parsedResource){
		Object.keys(parsedResource).forEach(function(key){
			allResourcesKeys[key] = true;
		});
	});
	
	var keys = Object.keys(allResourcesKeys);
	allResources.forEach(function(parsedResource){
		var newEntry = {};
		keys.forEach(function(key){
			newEntry[key] = parsedResource[key]===undefined ? null : parsedResource[key];
		});
		normalizedResources.push(replaceBooleans(newEntry));
	});
};

var parseQuestions = function(){
	allQuestions.forEach(function(parsedQuestion){
		Object.keys(parsedQuestion).forEach(function(key){
			allQuestionsKeys[key] = true;
		});
	});
	
	var keys = Object.keys(allQuestionsKeys);
	allQuestions.forEach(function(parsedQuestion, i){
		var newEntry = {};
		keys.forEach(function(key){
			newEntry[key] = parsedQuestion[key]===undefined ? null : parsedQuestion[key];
		});
		normalizedQuestions.push(replaceBooleans(newEntry));
	});
};

var replaceBooleans = function(object) {
	Object.keys(object).forEach(function(key){
		if (typeof(object[key])=="boolean") {
			object[key] = object[key] ? 1 : 0;
		}
	});
	return object;
};


MongoClient.connect(DBConnectionString, function(err, db) {
	db.collection("users").find({"email" : {$ne : null}}).toArray(function(error, cursorArray){
		cursorArray = cursorArray || [];
		console.log("Found", cursorArray.length, "documents with", error, "as error.");
		runAnalysis(cursorArray, function(errors, users){
			console.log("Analysis ran with", errors.length, "errors.");
			if (errors.length) {
				errors.forEach(function(e){
					console.log(e);
				});
			}
			db.collection("users_parsed").insertMany(users, function(err, result){
				console.log("Inserted in 'users_parsed' with", err, "as error.");
				
				var pqe = null;
				try {
					parseQuestions();
				} catch (e) {
					pqe = e;
				}
				console.log("Normalized questions parsed with", normalizedQuestions.length, "as length and", pqe, "as error.");
				
				var pre = null;
				try {
					parseResources();
				} catch (e) {
					pre = e;
				}
				console.log("Normalized resources parsed with", normalizedResources.length, "as length and", pre, "as error.");
				
				db.collection("normalized_resources").insertMany(normalizedResources, function(erro, result){
					console.log("Inserted in 'normalized_resources' with", erro, "as error.");
					db.collection("normalized_questions").insertMany(normalizedQuestions, function(erroq, result){
						console.log("Inserted in 'normalized_questions' with", erroq, "as error.");
						db.close();
						console.log("Done.");
					});
				});
			});
		});
	});
});