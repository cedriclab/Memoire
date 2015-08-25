window.Namespace.ResourcesView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["ResourcesView"];
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});