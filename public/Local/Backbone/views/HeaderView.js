window.Namespace.HeaderView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["HeaderView"];
	},
	
	tagName : "header",
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	fill : function(content){
		this.$el.empty().append(content);
	}
	
});