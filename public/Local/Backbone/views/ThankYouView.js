window.Namespace.ThankYouView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["ThankYouView"];
	},

	className : "container",
	
	close : function(){
		this.undelegateEvents();
		this.unbind();
	},
	
	render : function(options){
		this.$el.html(this.template());
		this.delegateEvents();
		return this;
	}

	
});