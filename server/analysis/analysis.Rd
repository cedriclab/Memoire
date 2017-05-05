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
questionAveragesDataFileName <- "./questions_averages.csv";
questionAveragesData <- read.csv(questionAveragesDataFileName, header=TRUE);
#resourceDataFileName <- "./normalized_resources.csv";
#resourceData <- read.csv(resourceDataFileName, header=TRUE);

questionData[["logStake"]] <- log(questionData$stake+1);
questionData[["logPerceivedStake"]] <- log(questionData$perceivedStake+1);
questionData[["logPerceivedStakeBias"]] <- questionData$perceivedStake - questionData$logStake;

questionData[["logEffortBase"]] <- log(questionData$effortBase+1);
questionData[["logCostSalary"]] <- log(questionData$costSalary+1);
questionData[["logCostBonus"]] <- log(questionData$costBonus+1);
questionData[["logTimeSpent"]] <- log(questionData$timeSpent+1);
questionData[["logTimeCostSalary"]] <- log(questionData$timeCostSalary+1);
questionData[["logTimeCostBonus"]] <- log(questionData$timeCostBonus+1);

questionAveragesData[["logMeanTime"]] <- log(questionAveragesData$meanTime+1);
questionAveragesData[["logMeanTimeCostSalary"]] <- log(questionAveragesData$meanTimeCostSalary+1);
questionAveragesData[["logMeanTimeCostBonus"]] <- log(questionAveragesData$meanTimeCostBonus+1);
questionAveragesData[["logMeanStake"]] <- log(questionAveragesData$meanStake+1);
questionAveragesData[["logMeanPerceivedStake"]] <- log(questionAveragesData$meanPerceivedStake+1);

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
questionAveragesDataFrame <- data.frame(questionAveragesData);
questionAveragesDataFrame[, "logMaxMeanStake"] <- apply(questionAveragesDataFrame[c("logMeanStake", "logMeanPerceivedStake")], 1, max)

questionDataFrame[["timeSpentFractionDelta"]] <- questionDataFrame$timeSpentFraction - (1/QUESTION_COUNT);
questionDataFrame[["timeSpentAboveAverage"]] <- ifelse(questionDataFrame$timeSpentFraction > 0 & questionDataFrame$timeSpentFraction > (1/QUESTION_COUNT), 1, 0);
answeredQuestionDataFrame <- subset(questionDataFrame, timeSpent > 0 & timeSpentFraction > 0 & timeSpentFraction < 1);
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

questionDataFrame$adviceUsed <- ifelse(questionDataFrame$adviceUsed > 0, 1, 0);

questionDataFrame$rightAnswerZScore = scale(questionDataFrame$userRightAnswers, center=TRUE, scale=TRUE);
questionDataFrame$userSkillZScore = scale(questionDataFrame$userSkillIndex, center=TRUE, scale=TRUE);

answeredQuestionDataFrame <- subset(questionDataFrame, timeSpent > 0 & timeSpentFraction > 0 & timeSpentFraction < 1);
answeredQuestionDataFrameWithEffortIndex <- subset(answeredQuestionDataFrame, is.finite(logEffortIndex));

firstHalfAnsweredQuestionDataFrame <- subset(answeredQuestionDataFrame, index < 10);
secondHalfAnsweredQuestionDataFrame <- subset(answeredQuestionDataFrame, index > 9);

#	Test various thresholds
thresholdsGLM <- function(depVar, indepMatrix, threshCount=10) {
	minDepVar <- min(depVar);
    step <- (max(depVar) - minDepVar)/threshCount;
    
    lMaxAIC <- 0;
    lBestFit <- NULL;
    lBestThreshold <- 0;
    lData <- NULL;
    
    for (i in 1:threshCount) {
        localDepVar <- ifelse(depVar > (minDepVar + (i*step)), 1, 0);
        localDF <- data.frame(indepMatrix);
        
        formula <- reformulate(termlabels = colnames(localDF), response = 'y');
        localDF[["y"]] <- localDepVar;
        localReg <- glm(formula, family=binomial(link='logit'), data= localDF);

        if (lMaxAIC < localReg$aic) {
            lMaxAIC <- localReg$aic;
            lBestFit <- summary(localReg);
            lBestThreshold <- i*step;
            lData <- localDepVar;
        }
    }
    
    return(
    	list(
    		"stepSize" = step,
    		"maxAIC" = lMaxAIC, 
    		"bestFit" = lBestFit, 
    		"bestThreshold" = minDepVar + (i*step)
    	)
    );
};

#	Test models

model <- as.formula("timeSpent ~ stake");
modelResults <- lm(model, answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("timeSpent ~ perceivedStake");
modelResults <- lm(model, answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logStake");
modelResults <- lm(model, answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logPerceivedStake");
modelResults <- lm(model, answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logStake + userRiskAversionIndex + isLateStart");
modelResults <- lm(model, answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logPerceivedStake + userRiskAversionIndex + isLateStart");
modelResults <- lm(model, answeredQuestionDataFrame);
summary(modelResults);

#	Now with split datasets

model <- as.formula("logTimeSpent ~ logStake + userRiskAversionIndex");
modelResults <- lm(model, firstHalfAnsweredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logPerceivedStake + userRiskAversionIndex");
modelResults <- lm(model, firstHalfAnsweredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logStake + isLateStart");
modelResults <- lm(model, secondHalfAnsweredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logPerceivedStake + isLateStart");
modelResults <- lm(model, secondHalfAnsweredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logStake + adviceUsed");
modelResults <- lm(model, answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("logTimeSpent ~ logPerceivedStake + adviceUsed");
modelResults <- lm(model, answeredQuestionDataFrame);
summary(modelResults);

#	Testing for possible interaction effects
model <- as.formula("adviceUsed ~ logStake + isLateStart");
modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("adviceUsed ~ logPerceivedStake + isLateStart");
modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
summary(modelResults);

#	Model with logit
model <- as.formula("timeSpentAboveAverage ~ logStake");
modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("timeSpentAboveAverage ~ logPerceivedStake");
modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("timeSpentAboveAverage ~ logStake + userRiskAversionIndex + isLateStart");
modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
summary(modelResults);

model <- as.formula("timeSpentAboveAverage ~ logPerceivedStake + userRiskAversionIndex + isLateStart");
modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
summary(modelResults);

modelResults <- thresholdsGLM(answeredQuestionDataFrame$logTimeSpent, answeredQuestionDataFrame["logStake"], 100);
print(modelResults$bestFit);

modelResults <- thresholdsGLM(answeredQuestionDataFrame$logTimeSpent, answeredQuestionDataFrame[c("logStake", "isLateStart")], 100);
print(modelResults$bestFit);

modelResults <- thresholdsGLM(answeredQuestionDataFrame$logTimeSpent, answeredQuestionDataFrame[c("logStake", "isLateStart", "adviceUsed")], 100);
print(modelResults$bestFit);

modelResults <- thresholdsGLM(answeredQuestionDataFrame$logTimeSpent, answeredQuestionDataFrame["logPerceivedStake"], 100);
print(modelResults$bestFit);

modelResults <- thresholdsGLM(answeredQuestionDataFrame$logTimeSpent, answeredQuestionDataFrame[c("logPerceivedStake", "isLateStart")], 100);
print(modelResults$bestFit);

modelResults <- thresholdsGLM(answeredQuestionDataFrame$logTimeSpent, answeredQuestionDataFrame[c("logPerceivedStake", "isLateStart", "adviceUsed")], 100);
print(modelResults$bestFit);