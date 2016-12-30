exports.tryAll = function(request, response){

	var possibilitiesCount = 0;

	response.contentType("application/json");
	response.send({"answers" : [], "possibilitiesTested" : possibilitiesCount});

};

exports.getPossibilitiesMatrix = function(){

	return Data.data.questionOrder.map(function(q){
		return Application.bruteforce.getPossibleAnswers(q-1);
	});

};

exports.getPossibleAnswers = function(questionID, parameters){

	parameters = parameters || {};
	var question = Data["questions"]["game"][questionID];
	var stepPrecision = 20;

	if (!Data.impacts[question.index].impactLess) {
		if (question.answerForm=="select") {
			return question.options.map(function(o){return o.id;});
		} else if (question.answerForm=="text") {
			if (question.scale) {
				var possibilities = new Array(stepPrecision);
				var step = (question.scale[1] - question.scale[0])/stepPrecision;
				for (var i=0; i<stepPrecision; i++) {
					possibilities[i] = step*(i+1);
				}
				return possibilities;
			}
			return [];
		} else if (question.answerForm=="text-multiple") {
			if (question.sum && parameters[question.sum]) {
				var f = question.fields.length;
				var possCount = Math.pow(stepPrecision, f);
				var possibilities = new Array(possCount);
				var step = sum/stepPrecision;

				for (var i=0; i<possCount; i++) {
					possibilities[i] = question.fields.reduce(function(object, field){
						object[field.name] = 0; 
						return object;
					}, {});
				}
				return possibilities;
			}
			return [];
		}
	}
	return [];

};