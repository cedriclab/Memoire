QUESTION_COUNT <- 12;

dataFileName <- "./normalized_questions.csv";
data <- read.csv(dataFileName, header=TRUE);

data[["logStake"]] = log(data$stake+1);
data[["logPercievedStake"]] = log(data$percievedStake+1);

dataFrame = data.frame(data);

firstModel <- as.formula("effortCostBonus ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
firstModelResults <- lm(firstModel, dataFrame);