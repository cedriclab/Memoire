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

library("clusterSEs");
require("plm");

QUESTION_COUNT <- 12;
QUESTION_ORDER <- c(0,1,3,4,5,7,9,10,11,16,18,19);
QUESTIONS_WITH_CHOICES = c(0,1,3,4,5,9,10,11,16,18);
currentOS <- Sys.info()['sysname'];


if (length(args) == 1) {
	setwd(args[1]);
} else if (currentOS=="Windows") {
	setwd("/Users/Cedric/Documents/Cours/Memoire/server/analysis");
} else if (currentOS=="Darwin") {
	setwd("/Users/cedriclevasseur-laberge/Documents/Cours/Memoire/server/analysis");
}

mode <- function(x) {
	ux <- unique(x);
	ux[which.max(tabulate(match(x, ux)))];
};

modes <- rep(NA,QUESTION_COUNT);


#	Load data files
#userDataFileName <- "./users_parsed.csv";
#userData <- read.csv(userDataFileName, header=TRUE);
questionDataFileName <- "./normalized_questions.csv";
questionData <- read.csv(questionDataFileName, header=TRUE);
#resourceDataFileName <- "./normalized_resources.csv";
#resourceData <- read.csv(resourceDataFileName, header=TRUE);

questionData[["logStake"]] <- log(questionData$stake+1);
questionData[["logPerceivedStake"]] <- log(questionData$perceivedStake+1);

questionData[["stakeFromImpact"]] <- questionData$instantImpact + questionData$recurringImpact;
questionData[["perceivedStakeFromImpact"]] <- (questionData$instantImpact + questionData$recurringImpact + questionData$perceivedStake)/2;
questionData[["logStakeFromImpact"]] <- log(questionData$stakeFromImpact+1);
questionData[["logPerceivedStakeFromImpact"]] <- log(questionData$perceivedStakeFromImpact+1);

questionData[["logEffortBase"]] <- log(questionData$effortBase+1);
questionData[["logCostSalary"]] <- log(questionData$costSalary+1);
questionData[["logCostBonus"]] <- log(questionData$costBonus+1);
questionData[["logTimeSpent"]] <- log(questionData$timeSpent+1);
questionData[["logTimeCostSalary"]] <- log(questionData$timeCostSalary+1);
questionData[["logTimeCostBonus"]] <- log(questionData$timeCostBonus+1);

questionData[["logEffortIndex"]] <- (questionData$logEffortBase-log(questionData$userMinEffort+1))/(log(questionData$userMaxEffort+1)-log(questionData$userMinEffort+1));
questionData[["logEffortAboveAverage"]] <- as.integer(as.logical(questionData$logEffortIndex > 0.5));
questionData[["logCostSalaryIndex"]] <- (questionData$logCostSalary-log(questionData$userMinCostSalary+1))/(log(questionData$userMaxCostSalary+1)-log(questionData$userMinCostSalary+1));
questionData[["logCostBonusIndex"]] <- (questionData$logCostBonus-log(questionData$userMinCostBonus+1))/(log(questionData$userMaxCostBonus+1)-log(questionData$userMinCostBonus+1));

questionData[["costSalaryIndex"]] <- (questionData$costSalary - questionData$userMinCostSalary) / (questionData$userMaxCostSalary - questionData$userMinCostSalary);
questionData[["costBonusIndex"]] <- (questionData$costBonus - questionData$userMinCostBonus) / (questionData$userMaxCostBonus - questionData$userMinCostBonus);

questionData[["usedAnyResource"]] <- as.integer(as.logical(questionData$usedResources));
questionData[["usedAdvice"]] <- as.integer(as.logical(questionData$adviceUsed));

#	Parse into data.frame objects
#userDataFrame <- data.frame(userData);
questionDataFrame <- data.frame(questionData);
answeredQuestionDataFrame <- subset(questionDataFrame, timeSpent > 0);
#resourceDataFrame <- data.frame(resourceData);

counter <- 0;
for (i in QUESTION_ORDER) {
	counter = counter+1;
	if (!is.na(match(i, QUESTIONS_WITH_CHOICES))) {
		y <- subset(answeredQuestionDataFrame, index==i)[["answer"]];
		t <- mode(as.numeric(levels(y))[y]);
		modes[counter] <- t;
	}
}

questionDataFrame$questionMode <- modes[match(questionDataFrame$index, QUESTION_ORDER)];
questionDataFrame$answerIsMode <- as.numeric(as.logical(questionDataFrame$answer == questionDataFrame$questionMode));

questionDataFrame$usedRawData <- as.numeric(as.logical(questionDataFrame$rawDataUsed));

questionDataFrame$rightAnswerZScore = scale(questionDataFrame$userRightAnswers, center=TRUE, scale=TRUE);
questionDataFrame$userSkillZScore = scale(questionDataFrame$userSkillIndex, center=TRUE, scale=TRUE);

answeredQuestionDataFrame <- subset(questionDataFrame, timeSpent > 0);
answeredQuestionDataFrameWithEffortIndex <- subset(answeredQuestionDataFrame, is.finite(logEffortIndex));


#	Test models
model1 <- as.formula("logCostBonus ~ logStake + userRiskAversionIndex + isLateStart");
model1Results <- lm(model1, answeredQuestionDataFrame);
summary(model1Results);

model2 <- as.formula("logCostSalary ~ logStake + userRiskAversionIndex + isLateStart");
model2Results <- lm(model2, answeredQuestionDataFrame);
summary(model2Results);

model3 <- as.formula("logCostBonus ~ logPerceivedStake + userRiskAversionIndex + isLateStart");
model3Results <- lm(model3, answeredQuestionDataFrame);
summary(model3Results);

model4 <- as.formula("logCostSalary ~ logPerceivedStake + userRiskAversionIndex + isLateStart");
model4Results <- lm(model4, answeredQuestionDataFrame);
summary(model4Results);

model5 <- as.formula("logCostBonus ~ logStake + isLateStart");
model5Results <- lm(model5, answeredQuestionDataFrame);
summary(model5Results);

model6 <- as.formula("logEffortBase ~ logPerceivedStake + userRiskAversionIndex + isLateStart");
model6Results <- lm(model6, answeredQuestionDataFrame);
summary(model6Results);

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
model11Results <- lm(model11, answeredQuestionDataFrame);
summary(model11Results);

model12 <- as.formula("logEffortBase ~ logPerceivedStake + userRiskAversionIndex + isLate");
model12Results <- lm(model12, answeredQuestionDataFrame);
summary(model12Results);

model13 <- as.formula("logEffortBase ~ logPerceivedStakeFromImpact + userRiskAversionIndex + isLate");
model13Results <- lm(model13, answeredQuestionDataFrame);
model13bResults <- lm(model1, subset(answeredQuestionDataFrame, index > 0));
summary(model13Results);
summary(model13bResults);

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

model24 <- as.formula("costSalaryIndex ~ logPerceivedStakeFromImpact + isLate + requiresMath");
model24Results <- lm(model24, answeredQuestionDataFrame);
summary(model24Results);

model25 <- as.formula("logEffortIndex ~ logStake + isLate + requiresMath");
model25Results <- lm(model25, answeredQuestionDataFrame);
summary(model25Results);

model25bResults <- cluster.bs.plm(model25, answeredQuestionDataFrame, cluster.se=TRUE, cluster="user_id");
summary(model25bResults);


model26 <- as.formula("logTimeSpent ~ logPerceivedStake + isLateStart + userRiskAversionIndex + requiresMath");
model26Results <- lm(model26, answeredQuestionDataFrame);
summary(model26Results);

model27 <- as.formula("logTimeSpent ~ logPerceivedStake + isLateStart + userRiskAversionIndex + bigNumbers");
model27Results <- lm(model27, answeredQuestionDataFrame);
summary(model27Results);
