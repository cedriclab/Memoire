library("rjson");
library("jsonlite");

#setwd("./Documents/Memoire/Proper");

QUESTION_COUNT <- 12;

jsonFile <- "./QuestionData.json";
jsonData <- fromJSON(jsonFile);

jsonDataWithData <- subset(jsonData, hasData==TRUE);

jsonData$meanTimeSpentSeconds = jsonData$meanTimeSpent/1000;

hist(jsonData$meanTimeSpentSeconds, main="Distribution du temps moyen de réponse par question");
hist(jsonData$meanUsedResourceCount, main="Distribution du nombre d'articles utilisés par question");
hist(jsonDataWithData$meanUsedData, main="Proportion de joueurs utilisant les données brutes par question", breaks=12);
hist(jsonData$meanUsedAdvice, main="Proportion de joueurs utilisant les conseils par question", breaks=10);
hist(jsonData$mostPopularAnswerPopularity, main="Proportion de joueurs ayant répondu la réponse la plus populaire", breaks=10);

plot(jsonData$index, jsonData$meanTimeSpentSeconds, type="s", lab=c(QUESTION_COUNT,5,7));
plot(jsonData$index, jsonData$meanUsedResourceCount, type="s", lab=c(QUESTION_COUNT,5,7));
plot(jsonDataWithData$index, jsonDataWithData$meanUsedData, type="s", lab=c(QUESTION_COUNT,5,7));
plot(jsonData$index, jsonData$meanUsedAdvice, type="s", lab=c(QUESTION_COUNT,5,7));
plot(jsonData$index, jsonData$mostPopularAnswerPopularity, type="s", lab=c(QUESTION_COUNT,5,7));