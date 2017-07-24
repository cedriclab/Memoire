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

#setwd(args[1]);
#setwd("/Users/Cedric/Documents/Cours/Memoire/server/analysis");
setwd("/Users/cedriclevasseur-laberge/Documents/Cours/Memoire/server/analysis");

source("setup.Rd");

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
	"rightAnswer ~ logTimeSpentOverAvg",
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

model <- as.formula("rightAnswer ~ logTimeSpentOverAvg");
modelResults <- glm(model, family=binomial(link='logit'), data=answeredQuestionDataFrame); #Using first half because of "hurry" effect in latter half
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
