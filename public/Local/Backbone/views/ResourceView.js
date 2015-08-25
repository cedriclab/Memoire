window.Namespace.ResourceView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["ResourceView"];
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	
});