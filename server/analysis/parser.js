var AVERAGE_WORDS_PER_SECOND = 3.33;

var addedCategories = ["suggestion", "complexity", "wordCount", "governmentSource", "sourceId", "language"];
var questionOrder = [1,2,4,5,6,8,10,11,12,17,19,20];

var additionalDataHash = {};
var questionSuggestions = require("../data/suggestion.js");
var adviceData = require("../data/advice.js");

var allResources = [];

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

					if (typeof(resource.resource) == "number") {
						var resourceInfo = additionalData[resource.resource-1];
						addedCategories.forEach(function(key){
							resource[key] = resourceInfo[key];
						});
						resource["linkUsedBefore"] = linksClicked.indexOf(resourceInfo.link) != -1;
						linksClicked.push(resourceInfo.link);
						resource["linkFamiliar"] = resourceInfo.sourceId ? user.preferredMedia.indexOf(parseInt(resourceInfo.sourceId)) : false;
					} else if (resource.resource=="advice") {
						var localAviceData = adviceData[String(qIndex)];
						resource["amountSpent"] = localAviceData.cost;
						resource["suggestion"] = localAviceData.suggestion;
						if (adviceData[String(qIndex)].heedCheck) {
							resource["heededAdvice"] = localAviceData.heedCheck(answeredQuestion);
						}
					} else {
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

				return answeredQuestion;
			});

			user["wordsPerSecond"] = wordsPerSecond.length ? wordsPerSecond.reduce(function(a, b){return a + b;}, 0)/wordsPerSecond.length : AVERAGE_WORDS_PER_SECOND;

			//TODO : find effort index per question
			answeredGameQuestions.forEach(function(answeredQuestion){
				answeredQuestion.resourcesUsed.forEach(function(resource, rIndex){
					resource["wordsRead"] = resource["timeSpent"] * user["wordsPerSecond"];
					if (resource.language=="EN") {
						resource["wordsRead"] = resource["wordsRead"] * (user.englishSkills===null ? 10 : user.englishSkills)/10;
					}
					resource["wordsRead"] = resource["wordsRead"] > resource.wordCount ? resource.wordCount : resource["wordsRead"];
					resource["pctRead"] = resource["wordsRead"]/resource.wordCount;



					var resourceClone = JSON.parse(JSON.stringify(resource));
					resourceClone.questionIndex = answeredQuestion.index;
					resourceClone.questionTime = answeredQuestion.timeSpent;
					resourceClone.userId = user._id;
					resourceClone.balance = user.balance;
					allResources.push(resourceClone);
				});
			});
		} catch (e) {
			errors.push(e);
		}
	});		
	
	callback(errors, users);
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
				db.close();
			});
		});
	});
});


