window.Namespace.WarmupQuestionView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["WarmupQuestionView"];
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});