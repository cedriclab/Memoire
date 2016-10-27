QUESTION_COUNT <- 12;

dataFileName <- "./normalized_questions.csv";
data <- read.csv(dataFileName, header=TRUE);

data[["logStake"]] = log(data$stake+1);
data[["logPercievedStake"]] = log(data$percievedStake+1);

dataFrame = data.frame(data);

model1 <- as.formula("effortCostBonus ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
model1Results <- lm(model1, dataFrame);
summary(model1Results);

model2 <- as.formula("effortCostSalary ~ logStake + userSkillIndex + userRiskAversionIndex + isLate");
model2Results <- lm(model2, dataFrame);
summary(model2Results);

model3 <- as.formula("effortCostBonus ~ logPercievedStake + userSkillIndex + userRiskAversionIndex + isLate");
model3Results <- lm(model3, dataFrame);
summary(model3Results);

model4 <- as.formula("effortCostSalary ~ logPercievedStake + userSkillIndex + userRiskAversionIndex + isLate");
model4Results <- lm(model4, dataFrame);
summary(model4Results);

model5 <- as.formula("effortCostBonus ~ logStake + isLate");
model5Results <- lm(model5, dataFrame);
summary(model5Results);