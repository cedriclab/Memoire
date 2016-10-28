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

userDataFileName <- "./users_parsed.csv";
userData <- read.csv(userDataFileName, header=TRUE);

questionDataFileName <- "./normalized_questions.csv";
questionData <- read.csv(questionDataFileName, header=TRUE);

resourceDataFileName <- "./normalized_resources.csv";
resourceData <- read.csv(resourceDataFileName, header=TRUE);

questionData[["logStake"]] = log(questionData$stake+1);
questionData[["logPercievedStake"]] = log(questionData$percievedStake+1);

userDataFrame = data.frame(userData);
questionDataFrame = data.frame(questionData);
resourceDataFrame = data.frame(resourceData);

model1 <- as.formula("effortCostBonus ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
model1Results <- lm(model1, questionDataFrame);
summary(model1Results);

model2 <- as.formula("effortCostSalary ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
model2Results <- lm(model2, questionDataFrame);
summary(model2Results);

model3 <- as.formula("effortCostBonus ~ logPercievedStake + userSkillIndex + userRiskAversionIndex + isLate");
model3Results <- lm(model3, questionDataFrame);
summary(model3Results);

model4 <- as.formula("effortCostSalary ~ logPercievedStake + userSkillIndex + userRiskAversionIndex + isLate");
model4Results <- lm(model4, questionDataFrame);
summary(model4Results);

model5 <- as.formula("effortCostBonus ~ logStake + isLate");
model5Results <- lm(model5, questionDataFrame);
summary(model5Results);