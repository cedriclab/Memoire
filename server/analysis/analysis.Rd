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


QUESTION_COUNT <- 12;
QUESTION_ORDER <- c(0,1,3,4,5,7,9,10,11,16,18,19);
QUESTIONS_WITH_CHOICES = c(0,1,3,4,5,9,10,11,16,18);
currentOS <- Sys.info()['sysname'];


#setwd(args[1]);
#setwd("/Users/Cedric/Documents/Cours/Memoire/server/analysis");
setwd("/Users/cedriclevasseur-laberge/Documents/Cours/Memoire/server/analysis");


mode <- function(x) {
	ux <- unique(x);
	ux[which.max(tabulate(match(x, ux)))];
};

modes <- rep(NA,QUESTION_COUNT);

#	La fonction LMP extrait la p-value du F-test d'un modèle linéaire
#	Stephen Turner, 2011
#	http://www.gettinggeneticsdone.com/2011/01/rstats-function-for-extracting-f-test-p.html
lmp <- function (modelobject) {
	if (class(modelobject) != "lm") stop("Not an object of class 'lm' ")
	f <- summary(modelobject)$fstatistic
	p <- pf(f[1],f[2],f[3],lower.tail=F)
	attributes(p) <- NULL
	return(p)
};

#	Load data files
#userDataFileName <- "./users_parsed.csv";
#userData <- read.csv(userDataFileName, header=TRUE);
questionDataFileName <- "./normalized_questions.csv";
questionData <- read.csv(questionDataFileName, header=TRUE);
questionAveragesDataFileName <- "./questions_averages.csv";
questionAveragesData <- read.csv(questionAveragesDataFileName, header=TRUE);
resourceDataFileName <- "./normalized_resources.csv";
resourceData <- read.csv(resourceDataFileName, header=TRUE);
allResourceDataFileName <- "./normalized_all_resources.csv";
allResourceData <- read.csv(allResourceDataFileName, header=TRUE);

questionData[["logStake"]] <- log(questionData$stake+1);
questionData[["logPerceivedStake"]] <- log(questionData$perceivedStake+1);
questionData[["logPerceivedStakeBias"]] <- questionData$perceivedStake - questionData$logStake;

resourceData$timeSpent <- (resourceData$timeSpent / 1000);
resourceData[["logTimeSpent"]] <- log(resourceData$timeSpent+1);
resourceData[["logQuestionStake"]] <- log(resourceData$questionStake+1);
resourceData[["logQuestionPerceivedStake"]] <- log(resourceData$questionPerceivedStake+1);
resourceData[["logQuestionTimeSpent"]] <- log(resourceData$questionTimeSpent+1);

allResourceData[["logQuestionStake"]] <- log(allResourceData $questionStake+1);
allResourceData[["logQuestionPerceivedStake"]] <- log(allResourceData $questionPerceivedStake+1);

questionData[["logEffortBase"]] <- log(questionData$effortBase+1);
questionData[["logCostSalary"]] <- log(questionData$costSalary+1);
questionData[["logCostBonus"]] <- log(questionData$costBonus+1);

questionData$timeSpent <- questionData$timeSpent / 1000;
questionData[["logTimeSpent"]] <- log(questionData$timeSpent+1);
questionData[["logTimeCostSalary"]] <- log(questionData$timeCostSalary+1);
questionData[["logTimeCostBonus"]] <- log(questionData$timeCostBonus+1);

questionAveragesData$meanTime <- (questionAveragesData$meanTime / 1000)
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
questionAveragesDataFrame[, "logMaxMeanStake"] <- apply(questionAveragesDataFrame[c("logMeanStake", "logMeanPerceivedStake")], 1, max);

questionDataFrame[["timeSpentFractionDelta"]] <- questionDataFrame$timeSpentFraction - (1/QUESTION_COUNT);
questionDataFrame[["timeSpentAboveAverage"]] <- ifelse(questionDataFrame$timeSpentFraction > 0 & questionDataFrame$timeSpentFraction > (1/QUESTION_COUNT), 1, 0);
answeredQuestionDataFrame <- subset(questionDataFrame, timeSpent > 0 & timeSpentFraction > 0 & timeSpentFraction < 1);

resourceDataFrame <- data.frame(resourceData);
resourceDataFrame$linkFamiliar[is.na(resourceDataFrame$linkFamiliar)] <- 0;
resourceDataFrame$isTrusted[is.na(resourceDataFrame$isTrusted)] <- 0;
resourceDataFrame$governmentSource[is.na(resourceDataFrame$governmentSource)] <- 0;
resourceDataFrame$heededAdvice[is.na(resourceDataFrame$heededAdvice)] <- 0;

allResourceDataFrame <- data.frame(allResourceData);

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

questionDataFrame$logStakeFirstHalf <- questionDataFrame$logStake * ifelse(questionDataFrame$index > 9, 0, 1);
questionDataFrame$logStakeSecondHalf <- questionDataFrame$logStake * ifelse(questionDataFrame$index > 9, 1, 0);
questionDataFrame$logPerceivedStakeFirstHalf <- questionDataFrame$logPerceivedStake * ifelse(questionDataFrame$index > 9, 0, 1);
questionDataFrame$logPerceivedStakeSecondHalf <- questionDataFrame$logPerceivedStake * ifelse(questionDataFrame$index > 9, 1, 0);

questionDataFrame$isLateStartFirstHalf <- questionDataFrame$isLateStart * ifelse(questionDataFrame$index > 9, 0, 1);
questionDataFrame$isLateStartSecondHalf <- questionDataFrame$isLateStart * ifelse(questionDataFrame$index > 9, 1, 0);

questionDataFrame$isLateEndFirstHalf <- questionDataFrame$isLateEnd * ifelse(questionDataFrame$index > 9, 0, 1);
questionDataFrame$isLateEndSecondHalf <- questionDataFrame$isLateEnd * ifelse(questionDataFrame$index > 9, 1, 0);

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
            lBestFit <- localReg;
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

#	Model descriptions
aqdf_MODELS <- c(
	"timeSpent ~ stake",
	"timeSpent ~ perceivedStake",
	"logTimeSpent ~ logStake",
	"logTimeSpent ~ logPerceivedStake",
	"logTimeSpent ~ logStake + userRiskAversionIndex + isLateStart",
	"logTimeSpent ~ logPerceivedStake + userRiskAversionIndex + isLateStart",
	"logTimeSpent ~ logStake + userRiskAversionIndex + isLateStartFirstHalf + isLateStartSecondHalf",
	"logTimeSpent ~ logPerceivedStake + userRiskAversionIndex + isLateStartFirstHalf + isLateStartSecondHalf",
	"logTimeSpent ~ logStake + adviceUsed",
	"logTimeSpent ~ logPerceivedStake + adviceUsed"
);

fhaqdf_MODELS <- c(
	"logTimeSpent ~ logStake + userRiskAversionIndex",
	"logTimeSpent ~ logStake + adviceUsed"
);

shaqdf_MODELS <- c(
	"logTimeSpent ~ logStake + isLateStart",
	"logTimeSpent ~ logPerceivedStake + isLateStart"
);

glm_MODELS <- c(
	"logTimeSpent ~ logStake",
	"logTimeSpent ~ logStake + isLateStartFirstHalf + isLateStartSecondHalf",
	"logTimeSpent ~ logStake + isLateStartFirstHalf + isLateStartSecondHalf + adviceUsed",
	"logTimeSpent ~ logPerceivedStake",
	"logTimeSpent ~ logPerceivedStake + isLateStartFirstHalf + isLateStartSecondHalf",
	"logTimeSpent ~ logPerceivedStake + isLateStartFirstHalf + isLateStartSecondHalf + adviceUsed"
);

glm_split_MODELS <- c(
	"logTimeSpent ~ logStakeFirstHalf + logStakeSecondHalf",
	"logTimeSpent ~ logStakeFirstHalf + logStakeSecondHalf + isLateStartFirstHalf + isLateStartSecondHalf",
	"logTimeSpent ~ logStakeFirstHalf + logStakeSecondHalf + isLateStartFirstHalf + isLateStartSecondHalf + adviceUsed",
	"logTimeSpent ~ logPerceivedStakeFirstHalf + logPerceivedStakeSecondHalf",
	"logTimeSpent ~ logPerceivedStakeFirstHalf + logPerceivedStakeSecondHalf + isLateStartFirstHalf + isLateStartSecondHalf",
	"logTimeSpent ~ logPerceivedStakeFirstHalf + logPerceivedStakeSecondHalf + isLateStartFirstHalf + isLateStartSecondHalf + adviceUsed"
);

impact_MODELS <- c(
	"rightAnswer ~ logTimeSpent",
	"rightAnswer ~ adviceUsed",
	"rightAnswer ~ articlesRead",
	"rightAnswer ~ dubiousArticlesRead",
	"rightAnswer ~ trustedArticlesRead"
);

#	Test models
for (modelDescription in aqdf_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- lm(model, answeredQuestionDataFrame);
	print(summary(modelResults));
}

#	Now with split datasets
for (modelDescription in fhaqdf_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- lm(model, firstHalfAnsweredQuestionDataFrame);
	print(summary(modelResults));
}

for (modelDescription in shaqdf_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- lm(model, secondHalfAnsweredQuestionDataFrame);
	print(summary(modelResults));
}

#Testing for impact of behavior on outcomes
model <- as.formula("rightAnswer ~ logTimeSpent");
modelResults <- glm(model, family=binomial(link='logit'), data=firstHalfAnsweredQuestionDataFrame); #Using first half because of "hurry" effect in latter half
summary(modelResults);

model <- as.formula("rightAnswer ~ adviceUsed");
modelResults <- glm(model, family=binomial(link='logit'), data= answeredQuestionDataFrame); 
summary(modelResults);

model <- as.formula("rightAnswer ~ articlesRead");
modelResults <- glm(model, family=binomial(link='logit'), data= answeredQuestionDataFrame); 
summary(modelResults);

model <- as.formula("rightAnswer ~ trustedArticlesRead + dubiousArticlesRead");
modelResults <- glm(model, family=binomial(link='logit'), data= answeredQuestionDataFrame); 
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

for (glmModel in glm_MODELS) {
	glmModelFormula <- as.formula(glmModel);
	mVars <- all.vars(glmModelFormula);
	modelResults <- thresholdsGLM(answeredQuestionDataFrame$logTimeSpent, answeredQuestionDataFrame[mVars[2:length(mVars)]], 100);
	print(modelResults$bestThreshold);
	print(summary(modelResults$bestFit));
}

for (glmModel in glm_split_MODELS) {
	glmModelFormula <- as.formula(glmModel);
	mVars <- all.vars(glmModelFormula);
	modelResults <- thresholdsGLM(answeredQuestionDataFrame$logTimeSpent, answeredQuestionDataFrame[mVars[2:length(mVars)]], 100);
	print(modelResults$bestThreshold);
	print(summary(modelResults$bestFit));
}

for (modelDescription in glm_split_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- lm(model, answeredQuestionDataFrame);
	print(summary(modelResults));
}

#	
regressPerUser <- function(modelDescription, dataFrame, testFunction=lm, significanceFunction=lmp) {
	userIds <- unique(dataFrame$user_id);
	userCount <- length(userIds);

	coefficient <- rep(NA, userCount);
	pValue <- rep(NA, userCount);
	userRiskAversionIndex <- rep(NA, userCount);
	balance <- rep(NA, userCount);
	significant5pct <- rep(NA, userCount);

	model <- as.formula(modelDescription);

	for (i in 1:userCount) {
		userId <- userIds[i];
		userDF <- subset(dataFrame, user_id == userId);

		userModelResults <- testFunction(model, userDF);
		userModelResultsCoefficients <- coef(summary(userModelResults));
		coefficient[i] = userModelResultsCoefficients[all.vars(model)[2], "Estimate"];
		pValue[i] <- significanceFunction(userModelResults);
		significant5pct[i] <- ifelse(pValue[i] < 0.05, 1, 0);

		userRiskAversionIndex[i] <- mean(userDF$userRiskAversionIndex);

		balance[i] <- mean(userDF$userBalance);
	}

	return(
		cbind(
			"user_id" = userIds,
			"coefficient" = coefficient,
			"pValue" = pValue,
			"significant5pct" = significant5pct,
			"userRiskAversionIndex" = userRiskAversionIndex,
			"balance" = balance
		)
	);
};

#	
testMultipleModels <- function(models, criterionFunction, dataFrame, testFunction, significanceFunction) {
	val <- 0;
	model <- NULL;
	modelData <- NULL;
	
	for (m in models) {
		localM <- data.frame(regressPerUser(m, dataFrame, testFunction, significanceFunction));
		criterionValue <- criterionFunction(localM);
		
		if (criterionValue > val) {
			val <- criterionValue;
			model <- m;
			modelData <- localM;
		}
	}
	
	return(
		list(
			"val" = val,
			"model" = model,
			"modelDataFrame" = modelData
		)
	);
};

by5pctSignificant <- function(df){
	return(sum(df$significant5pct));
};

byPValue <- function(df){
	return(sum(1 - df$pValue));
};

bestLinearModel <- testMultipleModels(glm_split_MODELS, by5pctSignificant, answeredQuestionDataFrame, lm, lmp);
bestLinearModel <- testMultipleModels(glm_split_MODELS, byPValue, answeredQuestionDataFrame, lm, lmp);

balanceOrder <- sort(bestLinearModel$modelDataFrame$balance, decreasing=TRUE);
bestLinearModel$modelDataFrame$balanceRank <- match(bestLinearModel$modelDataFrame$balance, balanceOrder);

bestLogitModel <- testMultipleModels(glm_split_MODELS, byPValue, answeredQuestionDataFrame, function(m, df){
	mVars <- all.vars(m);
	mThresh <- thresholdsGLM(df$logTimeSpent, df[mVars[2:length(mVars)]], 100);
	return(mThresh$bestFit);
}, function(results){
	mFormula <- results$formula;
	mVars <- all.vars(mFormula);
	nullModelFormula <- reformulate(termlabels = "1", response = mVars[1]);
	
	nullModelResults <- glm(nullModelFormula, family=results$family, data=results$data);

	return(pchisq(deviance(nullModelResults)-deviance(results), df.residual(nullModelResults)-df.residual(results), lower.tail=FALSE));
});

meanIsLateStartFirstHalf <- rep(0, 12);
meanIsLateStartSecondHalf <- rep(0, 12);
for (i in 1:length(QUESTION_ORDER)) {
	qIndex <- QUESTION_ORDER[i];
	questionDf <- subset(answeredQuestionDataFrame, index == qIndex);
	if (i < 7) {
		meanIsLateStartFirstHalf[i] <- mean(questionDf$isLateStart);
	} else {
		meanIsLateStartSecondHalf[i] <- mean(questionDf$isLateStart);
	}
}
questionAveragesDataFrame[, "meanIsLateStartFirstHalf"] <- meanIsLateStartFirstHalf;
questionAveragesDataFrame[, "meanIsLateStartSecondHalf"] <- meanIsLateStartSecondHalf;
questionAveragesDataFrame[, "logMeanStakeFirstHalf"] <- questionAveragesDataFrame$logMeanStake * ifelse(questionAveragesDataFrame$orderIndex < 7, 0, 1);
questionAveragesDataFrame[, "logMeanPerceivedStakeFirstHalf"] <- questionAveragesDataFrame$logMeanPerceivedStake * ifelse(questionAveragesDataFrame$orderIndex < 7, 0, 1);
questionAveragesDataFrame[, "logMeanStakeSecondHalf"] <- questionAveragesDataFrame$logMeanStake * ifelse(questionAveragesDataFrame$orderIndex < 7, 1, 0);
questionAveragesDataFrame[, "logMeanPerceivedStakeSecondHalf"] <- questionAveragesDataFrame$logMeanPerceivedStake * ifelse(questionAveragesDataFrame$orderIndex < 7, 1, 0);

#	Question models
question_linear_split_MODELS <- c(
	"logMeanTime ~ logMeanStakeFirstHalf + logMeanStakeSecondHalf",
	"logMeanTime ~ logMeanStakeFirstHalf + logMeanStakeSecondHalf + meanIsLateStartFirstHalf + meanIsLateStartSecondHalf",
	"logMeanTime ~ logMeanStakeFirstHalf + logMeanStakeSecondHalf + meanIsLateStartFirstHalf + meanIsLateStartSecondHalf + meanAdvice",
	"logMeanTime ~ logMeanPerceivedStakeFirstHalf + logMeanPerceivedStakeSecondHalf",
	"logMeanTime ~ logMeanPerceivedStakeFirstHalf + logMeanPerceivedStakeSecondHalf + meanIsLateStartFirstHalf + meanIsLateStartSecondHalf",
	"logMeanTime ~ logMeanPerceivedStakeFirstHalf + logMeanPerceivedStakeSecondHalf + meanIsLateStartFirstHalf + meanIsLateStartSecondHalf + meanAdvice"
);

for (modelDescription in question_linear_split_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- lm(model, questionAveragesDataFrame);
	print(summary(modelResults));
}

for (modelDescription in question_linear_split_MODELS) {
	glmModelFormula <- as.formula(modelDescription);
	mVars <- all.vars(glmModelFormula);
	modelResults <- thresholdsGLM(questionAveragesDataFrame$logMeanTime, questionAveragesDataFrame[mVars[2:length(mVars)]], 100);
	print(summary(modelResults$bestFit));
}

answeredQuestionDataFrame$adviceCostRatio <- answeredQuestionDataFrame$adviceCost / (answeredQuestionDataFrame$logStake + 1);
answeredQuestionDataFrame$adviceCostPerceivedRatio <- answeredQuestionDataFrame$adviceCost / (answeredQuestionDataFrame$logPerceivedStake + 1);

model <- as.formula("usedRawData ~ logTimeSpent");
modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
print(summary(modelResults));

model <- as.formula("articlesRead ~ logTimeSpent");
modelResults <- lm(model, data=answeredQuestionDataFrame);
print(summary(modelResults));

advice_MODELS <- c(
	"adviceUsed ~ logTimeSpent + adviceCostRatio",
	"adviceUsed ~ logTimeSpent + adviceCostPerceivedRatio"
);

advice_late_MODELS <- c(
	"adviceUsed ~ isLateEndFirstHalf + isLateEndSecondHalf + adviceCostRatio",
	"adviceUsed ~ isLateEndFirstHalf + isLateEndSecondHalf + adviceCostRatio + articlesRead",
	"adviceUsed ~ isLateEndFirstHalf + isLateEndSecondHalf + adviceCostRatio + articlesRead + usedRawData",
	"adviceUsed ~ isLateEndFirstHalf + isLateEndSecondHalf + adviceCostPerceivedRatio",
	"adviceUsed ~ isLateEndFirstHalf + isLateEndSecondHalf + adviceCostPerceivedRatio + articlesRead",
	"adviceUsed ~ isLateEndFirstHalf + isLateEndSecondHalf + adviceCostPerceivedRatio + articlesRead + usedRawData"
);

for (modelDescription in advice_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
	print(summary(modelResults));
}

for (modelDescription in advice_late_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame);
	print(summary(modelResults));
}

resource_MODELS <- c(
	"heededAdvice ~ isTrusted",
	"heededAdvice ~ linkFamiliar + governmentSource"
);

resource_time_MODELS <- c(
	"logTimeSpent ~ isTrusted",
	"logTimeSpent ~ linkFamiliar + governmentSource"
);

for (modelDescription in resource_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- glm(model, family=binomial(link='logit'), data=resourceDataFrame);
	print(summary(modelResults));
}

model <- as.formula("used ~ isTrusted");
modelResults <- glm(model, family=binomial(link='logit'), data=allResourceDataFrame);
print(summary(modelResults));

for (modelDescription in resource_time_MODELS) {
	model <- as.formula(modelDescription);
	modelResults <- lm(model, data=resourceDataFrame);
	print(summary(modelResults));
}
