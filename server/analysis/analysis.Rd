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

setwd("/Users/cedriclevasseur-laberge/Documents/Cours/Memoire/server/analysis");

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

questionData[["stakeFromImpact"]] = questionData$instantImpact + questionData$recurringImpact;
questionData[["perceivedStakeFromImpact"]] = (questionData$instantImpact + questionData$recurringImpact + questionData$perceivedStake)/2;
questionData[["logStakeFromImpact"]] = log(questionData$stakeFromImpact+1);
questionData[["logPerceivedStakeFromImpact"]] = log(questionData$perceivedStakeFromImpact+1);

questionData[["logEffortBase"]] = log(questionData$effortBase+1);
questionData[["logEffortCostSalary"]] = log(questionData$effortCostSalary+1);
questionData[["logEffortCostBonus"]] = log(questionData$effortCostBonus+1);
questionData[["logTimeSpent"]] = log(questionData$timeSpent+1);
questionData[["logTimeCostSalary"]] = log(questionData$timeCostSalary+1);
questionData[["logTimeCostBonus"]] = log(questionData$timeCostBonus+1);

questionData[["logEffortIndex"]] = (questionData$logEffortBase-log(questionData$userMinEffort+1))/(log(questionData$userMaxEffort+1)-log(questionData$userMinEffort+1));

questionData[["usedAnyResource"]] = as.integer(as.logical(questionData$usedResources));
questionData[["usedAdvice"]] = as.integer(as.logical(questionData$adviceUsed));

#	Parse into data.frame objects
userDataFrame <- data.frame(userData);
questionDataFrame <- data.frame(questionData);
answeredQuestionDataFrame <- subset(questionDataFrame, timeSpent > 0);
answeredQuestionDataFrameExcludingFirst <- subset(answeredQuestionDataFrame, index > 0);
answeredQuestionDataFrameWithEffortIndex <- subset(answeredQuestionDataFrame, is.finite(logEffortIndex));
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

model13 <- as.formula("logEffortBase ~ logPerceivedStakeFromImpact + userRiskAversionIndex + isLate");
model13Results <- lm(model13, answeredQuestionDataFrame);
summary(model13Results);

model14 <- as.formula("logEffortBase ~ logPerceivedStakeFromImpact + userRiskAversionIndex + isLate + bigNumbers");
model14Results <- lm(model14, answeredQuestionDataFrame);
summary(model14Results);

model15 <- as.formula("logEffortBase ~ logPerceivedStakeFromImpact + userRiskAversionIndex + isLate + bigNumbers + justLostMoney");
model15Results <- lm(model15, answeredQuestionDataFrame);
summary(model15Results);

model16 <- as.formula("logEffortBase ~ logPerceivedStakeFromImpact + userRiskAversionIndex + isLate + requiresMath + justLostMoney");
model16Results <- lm(model16, answeredQuestionDataFrame);
summary(model16Results);

model17 <- as.formula("logEffortBase ~ logPerceivedStakeFromImpact + userRiskAversionIndex + isLate + requiresMath");
model17Results <- lm(model17, answeredQuestionDataFrame);
summary(model17Results);

model18 <- as.formula("logEffortBase ~ logPerceivedStakeFromImpact + isLate + requiresMath");
model18Results <- lm(model18, answeredQuestionDataFrame);
summary(model18Results);

model19 <- as.formula("logEffortIndex ~ logPerceivedStakeFromImpact + isLate + requiresMath");
model19Results <- lm(model19, answeredQuestionDataFrameWithEffortIndex);
summary(model19Results);

model19GLMResults <- glm(model19, answeredQuestionDataFrameWithEffortIndex, family="binomial");
summary(model19GLMResults);

model20 <- as.formula("usedResources ~ logPerceivedStakeFromImpact + isLate + requiresMath");
model20Results <- lm(model20, answeredQuestionDataFrame);
summary(model20Results);

model21 <- as.formula("logTimeSpent ~ logPerceivedStakeFromImpact + isLate + requiresMath");
model21Results <- lm(model21, answeredQuestionDataFrame);
summary(model21Results);

model22 <- as.formula("usedAnyResource ~ logPerceivedStakeFromImpact + isLate + requiresMath");
model22Results <- lm(model22, answeredQuestionDataFrame);
summary(model22Results);

model22GLMResults <- glm(model22, answeredQuestionDataFrame, family="binomial");
summary(model22GLMResults);

model23 <- as.formula("usedAdvice ~ logPerceivedStakeFromImpact + isLate + requiresMath");
model23Results <- lm(model23, answeredQuestionDataFrame);
summary(model22Results);

model23GLMResults <- glm(model23, answeredQuestionDataFrame, family="binomial");
summary(model23GLMResults);