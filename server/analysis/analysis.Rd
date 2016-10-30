#
#	Université de Sherbrooke
#	
#	Mémoire de recherche en vue de l'obtention du grade de M.Sc. Économie
#	
#	Cédric Levasseur-Laberge
#
#	Sous la supervision de Dorothée Boccanfuso et Kim Lehrer
#
#	2016
#

if (length(args) == 1) {
	setwd(args[1]);
}

QUESTION_COUNT <- 12;

#	Load data files
userDataFileName <- "./users_parsed.csv";
userData <- read.csv(userDataFileName, header=TRUE);
questionDataFileName <- "./normalized_questions.csv";
questionData <- read.csv(questionDataFileName, header=TRUE);
resourceDataFileName <- "./normalized_resources.csv";
resourceData <- read.csv(resourceDataFileName, header=TRUE);

questionData[["logStake"]] = log(questionData$stake+1);
questionData[["logPerceivedStake"]] = log(questionData$perceivedStake+1);

questionData[["logEffortBase"]] = log(questionData$effortBase+1);
questionData[["logEffortCostSalary"]] = log(questionData$effortCostSalary+1);
questionData[["logEffortCostBonus"]] = log(questionData$effortCostBonus+1);

#	Parse into data.frame objects
userDataFrame <- data.frame(userData);
questionDataFrame <- data.frame(questionData);
answeredQuestionDataFrame <- subset(questionDataFrame, timeSpent > 0 & answer != NULL);
resourceDataFrame <- data.frame(resourceData);

#	Test models
model1 <- as.formula("logEffortCostBonus ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
model1Results <- lm(model1, questionDataFrame);
summary(model1Results);

model2 <- as.formula("logEffortCostSalary ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
model2Results <- lm(model2, questionDataFrame);
summary(model2Results);

model3 <- as.formula("logEffortCostBonus ~ logPerceivedStake + userSkillIndex + userRiskAversionIndex + isLate");
model3Results <- lm(model3, questionDataFrame);
summary(model3Results);

model4 <- as.formula("logEffortCostSalary ~ logPerceivedStake + userSkillIndex + userRiskAversionIndex + isLate");
model4Results <- lm(model4, questionDataFrame);
summary(model4Results);

model5 <- as.formula("logEffortCostBonus ~ logStake + isLate");
model5Results <- lm(model5, questionDataFrame);
summary(model5Results);

model6 <- as.formula("logEffortBase ~ logPerceivedStake + userSkillIndex + userRiskAversionIndex + isLate");
model6Results <- lm(model6, questionDataFrame);
summary(model6Results);

model6aResults <- lm(model6, answeredQuestionDataFrame);
summary(model6aResults);