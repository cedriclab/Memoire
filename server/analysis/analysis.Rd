#
#	Université de Sherbrooke
#	
#	MÃ©moire de recherche en vue de l'obtention du grade de M.Sc. Économie
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
questionData[["logTimeCostSalary"]] = log(questionData$timeCostSalary+1);
questionData[["logTimeCostBonus"]] = log(questionData$timeCostBonus+1);

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

model7 <- as.formula("timeCostSalary ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
model7Results <- lm(model7, answeredQuestionDataFrame);
summary(model7Results);

model8 <- as.formula("timeCostSalary ~ logPerceivedStake + userSkillIndex + userRiskAversionIndex + isLate");
model8Results <- lm(model8, answeredQuestionDataFrame);
summary(model8Results);

model9 <- as.formula("timeCostBonus ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
model9Results <- lm(model9, answeredQuestionDataFrame);
summary(model9Results);

model10 <- as.formula("timeCostBonus ~ logPerceivedStake + userSkillIndex + userRiskAversionIndex + isLate");
model10Results <- lm(model10, answeredQuestionDataFrame);
summary(model10Results);

model11 <- as.formula("logEffortBase ~ logPerceivedStake + userSkillIndex + userRiskAversionIndex + isLate");
model11Results <- lm(model11, questionDataFrame);
summary(model11Results);

model12 <- as.formula("logEffortBase ~ logPerceivedStake + userRiskAversionIndex + isLate");
model12Results <- lm(model12, questionDataFrame);
summary(model12Results);