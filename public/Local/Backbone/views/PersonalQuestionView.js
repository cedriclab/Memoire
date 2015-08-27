window.Namespace.PersonalQuestionView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["PersonalQuestionView"];
	},

	className : "container",

	events : {
		"click #submit" : "submit",
	},
	
	close : function(){
		this.undelegateEvents();
		this.unbind();
	},
	
	render : function(options){
		this.$el.html(this.template({questions: this.collection.toJSON()}));
		this.delegateEvents();
		return this;
	},

	submit : function(event){

	}

	
});