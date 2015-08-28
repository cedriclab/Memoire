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
		var values = this.$el.find("#personal-form").serializeArray().reduce(function(object, item){object[item.name] = item.value; return object;}, {});
		App.userModel.set(values);
		App.application.next();
	}

	
});