window.Namespace.WelcomeView = Backbone.View.extend({

	initialize : function(options){
		this.template = Templates["WelcomeView"];
	},

	events : {
		"change #consent" : "changeConsentStatus",
		"click #start" : "start"
	},

	close : function(){
		this.undelegateEvents();
		this.unbind();
	},

	className : "container",

	render : function(options){
		this.$el.html(this.template());
		this.delegateEvents();
		return this;
	},

	changeConsentStatus : function(event){
		if (this.$el.find("#consent").prop("checked")) {
			console.log("1")
			this.$el.find("#start").removeAttr("disabled");
		} else {
			console.log("2")
			this.$el.find("#start").attr("disabled", "disabled");
		}
	},

	start : function(event){
		if (this.$el.find("#consent").prop("checked")) {
			App.application.next();
		} else {
			App.application.showMessage("Vous devez avoir signé le formulaire de consentement!");
		}
	}

})