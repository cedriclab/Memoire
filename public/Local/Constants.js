(function(context){
	
	context.TEMPLATES_FOLDER = "Templates";
	context.TEMPLATES_LIST = ["HeaderView", "MainView", "WelcomeView", "ExplanationView", "WarmupQuestionView", "GameQuestionView", "PersonalQuestionView", "QuestionView", "ResourceView", "ResourcesView", "ThankYouView"];
	context.SECTIONS = ["Welcome", "Explanation", "WarmupQuestion", "GameQuestion", "PersonalQuestion", "ThankYou"];
	context.START_BUDGET = 5000;
    context.QUESTION_COUNT = 16;
    context.HAS_PAYPAL_PAYMENT = false;

})(window.Constants || {});