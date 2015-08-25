window.Namespace.WelcomeView = Backbone.View.extend({

	initialize : function(options){
		this.template = Templates["WelcomeView"];
	},

	render : function(options){
		this.$el.html(this.template());
	}

})