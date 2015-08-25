window.Namespace.QuestionView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["QuestionView"];
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});