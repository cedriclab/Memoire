/*
Faire le tri des variables, préparer une version du document avec seulement les variables utilisées MAIS étoffer

Croisement de variables : e.g.: isLateStart et aversion (e.g.: plus de stress)

*/



var AVERAGE_WORDS_PER_SECOND = 3.33;
var TURNS_PLAYED = 12;
var TOTAL_TURNS = 60;
var RESOURCE_USED_THRESHOLD = 8000;
var RAW_DATA_EFFORT_WEIGHT = 1.5;
var MINIMUM_WAGE = 10.55;

var MILISECONDS_PER_HOUR = 3600000;
var GAME_STAKE_MAX = 30;
var GAME_STAKE_MIN = 10;
var GAME_STAKE_BONUS = GAME_STAKE_MAX-GAME_STAKE_MIN;
var GAME_STAKE_MEAN = GAME_STAKE_MIN+(GAME_STAKE_BONUS/2);
var MEAN_TIME_FOR_QUESTION = MILISECONDS_PER_HOUR/24;
var GAME_STAKE_BONUS_PER_MILISECOND = GAME_STAKE_BONUS/(MILISECONDS_PER_HOUR/2);

var INITIAL_DOWRY = 5000;

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

var fs = require('fs');

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

var allPossibleResources = {};

var allResources = [];
var allResourcesKeys = {};
var normalizedResources = [];

var allQuestions = [];
var allQuestionsKeys = {};
var normalizedQuestions = [];

var questionMatrix = QUESTION_ORDER.reduce(function(object,item,index){
	object[item] = {"index" : item, "orderIndex" : index+1, "meanTime" : 0, "meanTimeCostSalary" : 0, "meanTimeCostBonus" : 0, "meanTimeFraction" : 0, "meanArticles" : 0, "meanRawData" : 0, "meanAdvice" : 0, "meanBestAnswer" : 0, "meanStake" : 0, "meanPerceivedStake" : 0, "isText" : 0, "count" : 0};
	return object;
}, {});

var prefixify = function(prefix, word){
	return prefix + word[0].toUpperCase() + word.substring(1);
};
var userAttributesToKeep = ["_id", "group", "balance", "resourceTrustIndex", "riskAversionIndex", "gullibilityIndex", "skillIndex", "mathSkillIndex", "fieldOfStudy", "studyProgram", "englishSkills", "articlesRead", "wordsPerSecond", "rawDataUsed", "adviceUsed", "dubiousArticlesRead", "dubiousArticlesHeeded", "trustedArticlesRead", "trustedArticlesHeeded", "adviceAdvicesHeeded", "totalResourcesUsed", "resourceTrustIndex", "totalResourcesUsed", "maxEffort", "minEffort", "skillWeight", "rightAnswers", "maxCostSalary", "minCostSalary", "maxCostBonus", "minCostBonus", "totalGameTime"];
var questionAttributesToKeep = ["index", "timeSpent", "timeSpentFraction", "rightAnswer", "stake", "perceivedStake", "effort", "effortBase", "costSalary", "costBonus", "isText", "questionWordCount", "adviceCost"];

var countQuestionWords = function(q){
	return q.text.split(" ").length + (q.options ? q.options.reduce(function(a, b){
		return a + b.text.split(" ").length;
	}, 0) : 0) + (q.resources ? q.resources.reduce(function(a, b){
		return a + b.title.split(" ").length + b.sample.split(" ").length;
	}, 0) : 0);
};

questionSuggestions.forEach(function(q, qi){
	additionalDataHash[q.index] = q;
	var rawQuestion = rawQuestions[QUESTION_ORDER[qi]+2];
	q["questionWordCount"] = countQuestionWords(rawQuestion);
	q["questionTextWordCount"] = rawQuestion.text.split(" ").length;
	q["isText"] = rawQuestion.answerForm != "select";
});

var warmupLengths = [0, 0, 0].map(function(n, i){
	return countQuestionWords(rawQuestions[i]);
});

var numerize = function(value) {
	if (typeof(value)=="number" && value===value) {
		return value;
	} else if (typeof(value)=="string") {
		var fl = parseFloat(value.replace(",", ".").replace(/[^0-9.]/g, ""));
		return fl===fl ? fl : null;
	} else if (typeof(value)=="object") {
		if (Array.isArray(value)) {
			return value.map(function(v){
				return numerize(v);
			});
		} else if (value) {
			Object.keys(value).forEach(function(k){
				value[k] = numerize(value[k]);
			});
			return value;
		}
	}
	return null;
};

var runAnalysis = function(users, callback) {
	
	var errors = [];
	var userWordsPerSecond = [];
	
	users.forEach(function(user){
		try {
			var wordsPerSecond = [];
			var totalTime = 0;
			var answeredGameQuestions = QUESTION_ORDER.map(function(qIndex){
				var answeredQuestion = user.answeredGameQuestions[qIndex-1];
				var additionalData = additionalDataHash[String(answeredQuestion.index+1)];
                
                additionalData.resources.forEach(function(resource, resourceIndex){
                    allPossibleResources[(user._id + "-" + String(qIndex) + "-" + resourceIndex)] = {
                        "user_id" : user._id,
                        "questionIndex" : qIndex,
                        "resourceIndex" : resourceIndex,
                        "isTrusted" : false,
                        "isDubious" : resource.isDubious || false,
                        "used" : false,
                        "questionStake" : additionalData.stake,
                        "questionPerceivedStake" : additionalData.perceivedStake,
                    };
                });
				
				answeredQuestion.answer = numerize(answeredQuestion.answer);
				
				answeredQuestion["timeSpent"] = answeredQuestion.answeredOn - answeredQuestion.begunOn;
				answeredQuestion["isText"] = additionalData.isText ? 1 : 0;
				answeredQuestion["timeBeforeFirstResource"] = 0;
				if (answeredQuestion.usedResources.length) {
					var t = answeredQuestion.usedResources[0].timeUsed - answeredQuestion.begunOn;
					answeredQuestion["timeBeforeFirstResource"] = t;
					wordsPerSecond.push(additionalData.questionWordCount*1000 / t);
				}
				
				totalTime += answeredQuestion["timeSpent"];
			});
			user["totalGameTime"] = totalTime;
			
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
			user.riskAversionIndex = user.riskAversionIndex/3;
		} catch (e) {
			console.log(e);
		}
	});
	
	empiricalAverageWordPerSecond = userWordsPerSecond.length ? userWordsPerSecond.reduce(function(a, b){return a + b;}, 0)/userWordsPerSecond.length : null;
	
	users.forEach(function(user, userIndex){
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
			
			var maxEffort = 0, minEffort = 0, maxCostSalary = 0, minCostSalary = 0, maxCostBonus = 0, minCostBonus = 0;
			
			user.englishSkills = parseFloat(user.englishSkills || 10)/10;

			var answeredGameQuestions = QUESTION_ORDER.map(function(qIndex){
				var answeredQuestion = user.answeredGameQuestions[qIndex-1];
				var additionalData = additionalDataHash[String(answeredQuestion.index+1)];
				
				var localAdviceData = adviceData[String(qIndex)];

				answeredQuestion["timeSpentFraction"] = answeredQuestion["timeSpent"] / user["totalGameTime"];
				
				answeredQuestion["articlesRead"] = 0;
				answeredQuestion["rawDataUsed"] = 0;
				answeredQuestion["adviceUsed"] = 0;
				answeredQuestion["dubiousArticlesRead"] = 0;
				answeredQuestion["dubiousArticlesHeeded"] = 0;
				answeredQuestion["trustedArticlesRead"] = 0;
				answeredQuestion["trustedArticlesHeeded"] = 0;
				answeredQuestion["heededResourceAdvice"] = false;
				answeredQuestion["heededAdviceAdvice"] = false;
				answeredQuestion["adviceCost"] = localAdviceData.cost;
				
				answeredQuestion["requiresMath"] = additionalData.requiresMath || false;
				answeredQuestion["bigNumbers"] = additionalData.bigNumbers || false;
				
				answeredQuestion["rightAnswer"] = false;
				if (localAdviceData.heedCheck) {
					answeredQuestion["rightAnswer"] = localAdviceData.heedCheck(answeredQuestion);
				} else if (localAdviceData.suggestion !== undefined) {
					answeredQuestion["rightAnswer"] = answeredQuestion.answer==localAdviceData.suggestion+1;
				}
				
				if (answeredQuestion["rightAnswer"]) {
					rightAnswers++;
				}
				
				answeredQuestion["belowStartBudget"] = answeredQuestion["previousBalance"] < INITIAL_DOWRY;
				answeredQuestion["below1000"] = answeredQuestion["previousBalance"] < 1000;

				answeredQuestion.usedResources.forEach(function(resource, rIndex){
					
					totalResourcesUsed++;
                    
                    var possibleResource = allPossibleResources[(user._id + "-" + String(qIndex) + "-" + String(resource.resource-1))];

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
						resource["linkFamiliar"] = resourceInfo.sourceId ? (user.preferredMedia.indexOf(parseInt(resourceInfo.sourceId)) != -1) : false;
						
						resource["isTrusted"] = resource["linkUsedBefore"] || resource["linkFamiliar"] || resource["governmentSource"];
                        
                        possibleResource["isTrusted"] = resource["isTrusted"];
                        possibleResource["used"] = true;
                        
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
						
						resource["heededAdvice"] = resource.suggestion ? answeredQuestion.answer==resource.suggestion+1 : null;
						
					} else if (resource.resource=="advice") {
						adviceUsed++;
						answeredQuestion["adviceUsed"] += 1;
			
						resource["amountSpent"] = localAdviceData.cost;
						resource["relativeAmountSpent"] = (localAdviceData.cost/INITIAL_DOWRY) * GAME_STAKE_BONUS;
						resource["suggestion"] = localAdviceData.suggestion;

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
				answeredQuestion["perceivedStake"] = typeof(additionalData["perceivedStake"])==="function" ? additionalData.perceivedStake(user, answeredQuestion.answer) : additionalData["perceivedStake"];
				
				return answeredQuestion;
			});

			user["wordsPerSecond"] = user["wordsPerSecond"] || empiricalAverageWordPerSecond;
			user["rightAnswers"] = rightAnswers;
			
			user["mathSkillIndex"] = (MATH_SKILLS[user.studyProgram] || MATH_SKILLS[user.fieldOfStudy] || 10)/10 || 1;
			user["skillIndex"] = (user.englishSkills + (rightAnswers/12))/2; 
			
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
			
			user["userSkillWeight"] = (10-Math.sqrt(user["skillIndex"] || 1))/10; //uses square root to squeeze distribution
			
			user["email"] = null;
			
			var startTime;
			answeredGameQuestions.forEach(function(answeredQuestion, aqi){
				var effortBase = 0, 
					costSalary = 0,
					costBonus = 0;
				if (!aqi) {
					startTime = answeredQuestion.begunOn;
				}
				
				answeredQuestion["justLostMoney"] = null;
				if (aqi) {
					if (aqi < answeredGameQuestions.length-1) {
						answeredQuestion["justLostMoney"] = answeredGameQuestions[aqi+1].previousBalance > answeredQuestion.previousBalance;
					} else {
						answeredQuestion["justLostMoney"] = user.balance > answeredQuestion.previousBalance;
					}
				}
				var userSalary = (user.salary || MINIMUM_WAGE)/MILISECONDS_PER_HOUR;
				
				answeredQuestion.usedResources.forEach(function(resource, rIndex){
					resource["wordsRead"] = resource["timeSpent"] * user["wordsPerSecond"];
					if (resource.language=="EN") {
						resource["wordsRead"] = resource["wordsRead"] * (user.englishSkills===null ? 10 : user.englishSkills)/10;
					}
					resource["wordsRead"] = resource["wordsRead"] > resource.wordCount ? resource.wordCount : resource["wordsRead"];
					resource["pctRead"] = resource["wordsRead"]/resource.wordCount;
						
					resource["effortBase"] = (resource["timeSpent"]/user["userSkillWeight"])*(resource.language=="EN" ? (2-(user.englishSkills || 1)) : 1);
					resource["costSalary"] = resource["timeSpent"]*userSalary;
					resource["costBonus"] = resource["timeSpent"]*GAME_STAKE_BONUS_PER_MILISECOND;
					
					if (resource.resource=="advice") {
						resource["costSalary"] += resource["relativeAmountSpent"]; 
						resource["costBonus"] += resource["relativeAmountSpent"];
					} 
					
					effortBase += resource["effortBase"];
					costSalary += resource["costSalary"];
					costBonus += resource["costBonus"];		
					
					resource["timeCostSalary"] = resource["timeSpent"]*userSalary;
					resource["timeCostBonus"] = resource["timeSpent"]*GAME_STAKE_BONUS_PER_MILISECOND;

				});
				
				var priorWeightedTime = answeredQuestion.timeBeforeFirstResource / user["userSkillWeight"];
				var weightedTime = answeredQuestion.timeSpent / user["userSkillWeight"];
				
				effortBase = effortBase ? (effortBase + priorWeightedTime) : weightedTime; //uses square root to squeeze distribution
				costSalary = costSalary ? costSalary + priorWeightedTime*userSalary : weightedTime*userSalary;
				costBonus = costBonus ? costBonus + priorWeightedTime*GAME_STAKE_BONUS_PER_MILISECOND : weightedTime*GAME_STAKE_BONUS_PER_MILISECOND;
				
				if (!aqi) {
					maxEffort = effortBase;
					minEffort = effortBase;
					maxCostSalary = costSalary;
					minCostSalary = costSalary;
					maxCostBonus = costBonus;
					minCostBonus = costBonus;
				}
				
				if (effortBase>maxEffort) {
					maxEffort = effortBase;
				} else if (effortBase<minEffort) {
					minEffort = effortBase;
				}
				
				if (costSalary>maxCostSalary) {
					maxCostSalary = costSalary;
				} else if (costSalary<minCostSalary) {
					minCostSalary = costSalary;
				}
				
				if (costBonus>maxCostBonus) {
					maxCostBonus = costBonus;
				} else if (costBonus<minCostBonus) {
					minCostBonus = costBonus;
				}

				answeredQuestion["effortBase"] = effortBase;
				answeredQuestion["costSalary"] = costSalary;
				answeredQuestion["costBonus"] = costBonus;
				
				answeredQuestion["timeCostSalary"] = answeredQuestion.timeSpent*((user.salary || MINIMUM_WAGE)/MILISECONDS_PER_HOUR);
				answeredQuestion["timeCostBonus"] = answeredQuestion.timeSpent*GAME_STAKE_BONUS_PER_MILISECOND;
				
				answeredQuestion.isLateStart = false;
				answeredQuestion.isLateEnd = null;
				if (aqi) {
					answeredQuestion.isLateStart = (answeredQuestion.begunOn - startTime) > (MEAN_TIME_FOR_QUESTION * aqi);
				}
				answeredQuestion.isLateEnd = (answeredQuestion.answeredOn - startTime) > (MEAN_TIME_FOR_QUESTION * (aqi+1));
				answeredQuestion.isLate = answeredQuestion.isLateStart || answeredQuestion.isLateEnd;
			});

			user["maxEffort"] = maxEffort;
			user["minEffort"] = minEffort;
			user["maxCostSalary"] = maxCostSalary;
			user["minCostSalary"] = minCostSalary;
			user["maxCostBonus"] = maxCostBonus;
			user["minCostBonus"] = minCostBonus;
			
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
				
				if (answeredQuestion.timeSpent > 0 && answeredQuestion.timeSpentFraction > 0 && answeredQuestion.timeSpentFraction < 1) {
					var questionMatrixEntry = questionMatrix[parseInt(answeredQuestion.index)+1];
					
					questionMatrixEntry.count += 1;
					questionMatrixEntry.meanTime += answeredQuestion.timeSpent;
					questionMatrixEntry.meanTimeCostSalary += answeredQuestion.timeCostSalary;
					questionMatrixEntry.meanTimeCostBonus += answeredQuestion.timeCostBonus;
					questionMatrixEntry.meanTimeFraction += answeredQuestion.timeSpentFraction;
					questionMatrixEntry.meanArticles += answeredQuestion.articlesRead;
					questionMatrixEntry.meanRawData += answeredQuestion.rawDataUsed;
					questionMatrixEntry.meanAdvice += answeredQuestion.adviceUsed;
					questionMatrixEntry.meanStake += answeredQuestion.stake;
					questionMatrixEntry.meanPerceivedStake += answeredQuestion.perceivedStake;
					questionMatrixEntry.meanBestAnswer += answeredQuestion.rightAnswer ? 1 : 0;
					if (answeredQuestion.isText) {
						questionMatrixEntry.isText = 1;
					}
				}

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

var parseAllResources = function() {
    return Object.keys(allPossibleResources).map(function(allPossibleResourceId){
        return replaceBooleans(allPossibleResources[allPossibleResourceId]);
    });
};

var parseQuestionAverages = function(){
	var questionMatrixKeys = Object.keys(questionMatrix[1]);
	
	
	fs.writeFile('questions_averages.csv', questionMatrixKeys.join(',')+'\n'+Object.keys(questionMatrix).map(function(qmi){
		var questionMatrixEntry = questionMatrix[qmi];
				
		questionMatrixEntry.meanTime /= questionMatrixEntry.count;
		questionMatrixEntry.meanTimeCostSalary /= questionMatrixEntry.count;
		questionMatrixEntry.meanTimeCostBonus /= questionMatrixEntry.count;
		questionMatrixEntry.meanTimeFraction /= questionMatrixEntry.count;
		questionMatrixEntry.meanArticles /= questionMatrixEntry.count;
		questionMatrixEntry.meanRawData /= questionMatrixEntry.count;
		questionMatrixEntry.meanAdvice /= questionMatrixEntry.count;
		questionMatrixEntry.meanStake /= questionMatrixEntry.count;
		questionMatrixEntry.meanPerceivedStake /= questionMatrixEntry.count;
		questionMatrixEntry.meanBestAnswer /= questionMatrixEntry.count;
		
		return questionMatrixKeys.map(function(qmk){
			return String(questionMatrixEntry[qmk]);
		}).join(',');
	}).join('\n'), function(err){
		console.log("questions_averages.csv written with [", (err ? err.message : ""), "] as error.");
	});
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
                
                var prea = null,
                    allAndAllResources;
				try {
					allAndAllResources = parseAllResources();
				} catch (e) {
					prea = e;
				}
				console.log("Normalized ALL resources parsed with", allAndAllResources.length, "as length and", prea, "as error.");
				
				parseQuestionAverages();
				
				db.collection("normalized_resources").insertMany(normalizedResources, function(erro, result){
					console.log("Inserted in 'normalized_resources' with", erro, "as error.");
					db.collection("normalized_questions").insertMany(normalizedQuestions, function(erroq, result){
						console.log("Inserted in 'normalized_questions' with", erroq, "as error.");
						db.collection("normalized_all_resources").insertMany(allAndAllResources, function(erroa, result){
                            console.log("Inserted in 'normalized_all_resources' with", erroa, "as error.");
                            db.close();
                            console.log("Done.");
                        });
					});
				});
			});
		});
	});
});
