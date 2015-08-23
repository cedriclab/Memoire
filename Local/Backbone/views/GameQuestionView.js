window.Namespace.GameQuestionView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["GameQuestionView"];
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});