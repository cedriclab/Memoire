window.Namespace.MainView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["MainView"];
	},
	
	className : "row",
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	fill : function(content){
		this.$el.empty().append(content);
	}
	
});