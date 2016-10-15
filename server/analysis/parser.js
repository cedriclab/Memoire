var AVERAGE_WORDS_PER_SECOND = 3.33;
var TURNS_PLAYED = 12;
var TOTAL_TURNS = 60;

var MongoDB = require('mongodb');
var DBConnectionString = "mongodb://localhost:27017/memoire_manips";
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;

var addedCategories = ["suggestion", "complexity", "wordCount", "governmentSource", "sourceId", "language"];
var questionOrder = [1,2,4,5,6,8,10,11,12,17,19,20];

var additionalDataHash = {};
var questionSuggestions = require("../data/suggestion.js");
var adviceData = require("../data/advice.js");

var allResources = [];
var allResourcesKeys = {};
var normalizedResources = [];

var allQuestions = [];
var allQuestionsKeys = {};
var normalizedQuestions = [];

var prefixify = function(prefix, word){
	return prefix + word[0].toUpperCase() + word.substring(1);
};
var userAttributesToKeep = [];

questionSuggestions.forEach(function(q){
	additionalDataHash[q.index] = q;
	
	q["questionWordCount"] = q.text.split(" ").length + (q.options ? q.options.reduce(function(a, b){
		return a + b.text.split(" ").length;
	}, 0) : 0) + (q.resources ? q.resources.reduce(function(a, b){
		return a + b.title.split(" ").length + b.sample.split(" ").length;
	}, 0) : 0);
});

var runAnalysis = function(users, callback) {
	
	var errors = [];
	
	users.forEach(function(user){
		try {
			var linksClicked = [];
			var wordsPerSecond = [];
			
			var articlesRead = 0;
			var rawDataUsed = 0;
			var adviceUsed = 0;
			var resourceAdvicesHeeded = 0;

			var answeredGameQuestions = questionOrder.map(function(qIndex){
				var answeredQuestion = user.answeredGameQuestions[qIndex-1];
				var additionalData = additionalDataHash[answeredQuestion.index];

				answeredQuestion["timeSpent"] = answeredQuestion.answeredOn - answeredQuestion.begunOn;
				answeredQuestion["timeBeforeFirstResource"] = 0;
				if (answeredQuestion.resourcesUsed.length) {
					var t = answeredQuestion.resourcesUsed[0].timeUsed - answeredQuestion.begunOn;
					answeredQuestion["timeBeforeFirstResource"] = t;
					wordsPerSecond.push(additionalData.questionWordCount*1000 / t);
				}

				answeredQuestion["heededResourceAdvice"] = false;



				answeredQuestion.resourcesUsed.forEach(function(resource, rIndex){
					
					totalResourcesUsed++;

					if (typeof(resource.resource) == "number") {
						articlesRead++;
						var resourceInfo = additionalData.resources[resource.resource-1];
						addedCategories.forEach(function(key){
							resource[key] = resourceInfo[key];
						});
						resource["linkUsedBefore"] = linksClicked.indexOf(resourceInfo.link) != -1;
						linksClicked.push(resourceInfo.link);
						resource["linkFamiliar"] = resourceInfo.sourceId ? user.preferredMedia.indexOf(parseInt(resourceInfo.sourceId)) : false;
						
						resource["easilyTrustable"] = 
					} else if (resource.resource=="advice") {
						adviceUsed++;
						var localAviceData = adviceData[String(qIndex)];
						resource["amountSpent"] = localAviceData.cost;
						resource["suggestion"] = localAviceData.suggestion;
						if (adviceData[String(qIndex)].heedCheck) {
							resource["heededAdvice"] = localAviceData.heedCheck(answeredQuestion);
						}
					} else {
						rawDataUsed++;
						//TODO : deal with raw data
					}

					if (rIndex != answeredQuestion.resourcesUsed.length-1) {
						resource["timeSpent"] = answeredQuestion.resourcesUsed[rIndex+1].timeUsed - resource.timeUsed;
					} else {
						resource["timeSpent"] = answeredQuestion.answeredOn - resource.timeUsed;
					}

					if (resource["heededAdvice"] !== undefined) {
						resource["heededAdvice"] = resource.suggestion ? answeredQuestion.answer==String(resource.suggestion+1) : null;
					}
					if (resource["heededAdvice"]) {
						answeredQuestion["heededResourceAdvice"] = true;
					}

				});
				
				if (answeredQuestion["heededResourceAdvice"]) {
					resourceAdvicesHeeded++;
				}
				
				answeredQuestion["stake"] = additionalData["stake"];
				answeredQuestion["percievedStake"] = additionalData["percievedStake"];
				
				return answeredQuestion;
			});

			user["wordsPerSecond"] = wordsPerSecond.length ? wordsPerSecond.reduce(function(a, b){return a + b;}, 0)/wordsPerSecond.length : AVERAGE_WORDS_PER_SECOND;
			user["articlesRead"] = articlesRead;
			user["rawDataUsed"] = rawDataUsed;
			user["adviceUsed"] = adviceUsed;
			user["resourceAdvicesHeeded"] = resourceAdvicesHeeded;
			user["totalResourcesUsed"] = articlesRead + rawDataUsed + adviceUsed;
			user["resourceTrustIndex"] = user["totalResourcesUsed"] > 0 ? user["resourceAdvicesHeeded"]/user["totalResourcesUsed"] : 0;
			
			//TODO : find effort index per question
			answeredGameQuestions.forEach(function(answeredQuestion){
				var effortBase = 0, 
					effortCostSalary = 0,
					effortCostBonus = 0;
				
				answeredQuestion.resourcesUsed.forEach(function(resource, rIndex){
					resource["wordsRead"] = resource["timeSpent"] * user["wordsPerSecond"];
					if (resource.language=="EN") {
						resource["wordsRead"] = resource["wordsRead"] * (user.englishSkills===null ? 10 : user.englishSkills)/10;
					}
					resource["wordsRead"] = resource["wordsRead"] > resource.wordCount ? resource.wordCount : resource["wordsRead"];
					resource["pctRead"] = resource["wordsRead"]/resource.wordCount;

//FOR EACH RESOURCE, THEN SUM FOR QUESTION
//effortBase = SUM resourceTime*(1 || (RAW_COMPLEXITY*(1/fields[user.fieldOfStudy].mathSkills)) || 10/user.englishSkills) -- for raw and article
//effortCostSalary = SUM effortBase*(user.salary || MINIMUM_WAGE) || advice.cost
//effortCostBonus = SUM effortBase*(gameStake/(30*60*1000)) || advice.cost				
					
				});
				
				answeredQuestion["effortBase"] = effortBase;
				answeredQuestion["effortCostSalary"] = effortCostSalary;
				answeredQuestion["effortCostBonus"] = effortCostBonus;
			});

			answeredGameQuestions.forEach(function(answeredQuestion){
				
				answeredQuestion.resourcesUsed.forEach(function(resource, rIndex){
					var resourceClone = JSON.parse(JSON.stringify(resource));
					resourceClone.questionIndex = answeredQuestion.index;
					resourceClone.questionTime = answeredQuestion.timeSpent;
					resourceClone.questionStake = 0; //TODO : find question stake
					resourceClone.questionPercievedStake = 0; //TODO : find question percieved stake
					resourceClone.questionEffort = 0; //TODO : find total question effort
					resourceClone.userId = user._id;
					resourceClone.userBalance = user.balance;
					resourceClone.resourceTrustIndex = user.resourceTrustIndex;
					allResources.push(resourceClone);
				});
				
				var questionClone = JSON.parse(JSON.stringify(answeredQuestion));
				questionClone.questionIndex = answeredQuestion.index;
				questionClone.questionTime = answeredQuestion.timeSpent;
				questionClone.resourcesUsed = questionClone.resourcesUsed.length;
				questionClone.userId = user._id;
				questionClone.userBalance = user.balance;
				questionClone.resourceTrustIndex = user.resourceTrustIndex;
				allQuestions.push(questionClone);
			});
		} catch (e) {
			errors.push(e);
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
		normalizedResources.push(newEntry);
	});
};

var parseQuestions = function(){
	allQuestions.forEach(function(parsedQuestion){
		Object.keys(parsedQuestion).forEach(function(key){
			allQuestionsKeys[key] = true;
		});
	});
	
	var keys = Object.keys(allQuestionsKeys);
	allQuestions.forEach(function(parsedQuestion){
		var newEntry = {};
		keys.forEach(function(key){
			newEntry[key] = parsedQuestion[key]===undefined ? null : parsedQuestion[key];
		});
		normalizedQuestions.push(newEntry);
	});
};


MongoClient.connect(DBConnectionString, function(err, db) {
	db.collection("users").find(queryParams).toArray(function(error, cursorArray){
		cursorArray = cursorArray || [];
		console.log("Found", cursorArray.length "documents with", error, "as error.");
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


