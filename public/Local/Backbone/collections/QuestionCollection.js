window.Namespace.QuestionCollection = Backbone.Collection.extend({

	url : "/questions",

	model: Namespace.QuestionModel,

	parse : function(data){
		return data.questions;
	},

	comparator : function(model){
		return parseInt(model.get("index") || 0);
	}

})