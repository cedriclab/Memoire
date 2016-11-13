mongo ./clean_db.js

node parser.js

touch users_parsed.csv
touch normalized_questions.csv
touch normalized_resources.csv

#mongoexport --db memoire_manips --collection users_parsed --type=csv --fields  --out users_parsed.csv

mongoexport --db memoire_manips --collection normalized_questions --type=csv --fields id,index,begunOn,answeredOn,answer,usedResources,instantImpact,recurringImpact,previousBalance,timeSpent,timeBeforeFirstResource,articlesRead,rawDataUsed,adviceUsed,dubiousArticlesRead,dubiousArticlesHeeded,trustedArticlesRead,trustedArticlesHeeded,heededResourceAdvice,heededAdviceAdvice,rightAnswer,stake,perceivedStake,effortBase,costSalary,costBonus,timeCostSalary,timeCostBonus,isLateStart,isLateEnd,isLate,requiresMath,belowStartBudget,below1000,justLostMoney,bigNumbers,user_id,userBalance,userResourceTrustIndex,userRiskAversionIndex,userGullibilityIndex,userSkillIndex,userMathSkillIndex,userFieldOfStudy,userStudyProgram,userEnglishSkills,userArticlesRead,userRawDataUsed,userAdviceUsed,userDubiousArticlesRead,userDubiousArticlesHeeded,userTrustedArticlesRead,userTrustedArticlesHeeded,userAdviceAdvicesHeeded,userTotalResourcesUsed,userMaxEffort,userMinEffort,userMathSkillWeight,userSkillWeight,userWordsPerSecond,userRightAnswers --out normalized_questions.csv

#mongoexport --db memoire_manips --collection normalized_resources --type=csv --fields  --out normalized_resources.csv

#Rscript analysis.Rd ${pwd}

#rm users_parsed.csv
#rm normalized_questions.csv
#rm normalized_resources.csv