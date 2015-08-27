window.Namespace.ExplanationView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["ExplanationView"];
	},

	events : {
		"click #understood" : "goToGame"
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
	},

	goToGame : function(index){
		App.application.next();
	}
	
});