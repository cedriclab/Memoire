window.Namespace.PersonalQuestionView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["PersonalQuestionView"];
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});