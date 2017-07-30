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


mode <- function(x) {
	ux <- unique(x);
	ux[which.max(tabulate(match(x, ux)))];
};

modes <- rep(NA,QUESTION_COUNT);
timeMeans <- rep(NA,QUESTION_COUNT);

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
	  thisQuestionDf <- subset(answeredQuestionDataFrame, index==i);
		y <- thisQuestionDf[["answer"]];
		t <- mode(as.numeric(levels(y))[y]);
		modes[counter] <- t;
		timeMeans[counter] <- mean(thisQuestionDf$logTimeSpent);
	}
}

questionDataFrame$questionMode <- modes[match(questionDataFrame$index, QUESTION_ORDER)];
questionDataFrame$answerIsMode <- as.numeric(as.logical(questionDataFrame$answer == questionDataFrame$questionMode));

questionDataFrame$logTimeSpentOverAvg <- questionDataFrame$logTimeSpent - timeMeans[match(questionDataFrame$index, QUESTION_ORDER)];

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



firstHalfAnsweredQuestionDataFrame <- subset(answeredQuestionDataFrame, index < 9);
secondHalfAnsweredQuestionDataFrame <- subset(answeredQuestionDataFrame, index >= 9);



#	Test various thresholds
thresholdsGLM <- function(depVar, indepMatrix, threshCount=10) {
	minDepVar <- min(depVar);
	valRange <- max(depVar) - minDepVar;
    step <- (valRange/2)/threshCount;
    depVarStart <- minDepVar + (valRange/4);
    
    lMaxAIC <- 0;
    lBestFit <- NULL;
    lBestThreshold <- 0;
    lData <- NULL;
    
    for (i in 1:threshCount) {
        localDepVar <- ifelse(depVar > (depVarStart + (i*step)), 1, 0);
        localDF <- data.frame(indepMatrix);
        
        formula <- reformulate(termlabels = colnames(localDF), response = 'y');
        localDF[["y"]] <- localDepVar;
        localReg <- glm(formula, family=binomial(link='logit'), data= localDF);

        if (lMaxAIC < localReg$aic) {
            lMaxAIC <- localReg$aic;
            lBestFit <- localReg;
            lBestThreshold <- depVarStart + (i*step);
            lData <- localDepVar;
        }
    }
    
    return(
    	list(
    		"stepSize" = step,
    		"maxAIC" = lMaxAIC, 
    		"bestFit" = lBestFit, 
    		"bestThreshold" = lBestThreshold
    	)
    );
};

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