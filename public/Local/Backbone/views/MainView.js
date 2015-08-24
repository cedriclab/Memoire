window.Namespace.MainView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["MainView"];
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});