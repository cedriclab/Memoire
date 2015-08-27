window.Namespace.QuestionView = Backbone.View.extend({
	
	initialize : function(options){
		options = options || {};
		this.template = Templates["QuestionView"];
		this._superSection = options.superSection;
	},

	className : "container",

	events : {
		"click #submit" : "submit"
	},

	close : function(){
		this.undelegateEvents();
		this.unbind();
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		this.delegateEvents();
		return this;
	},

	submit: function(event){
		var values = this.$el.find("#question-form").serializeArray().reduce(function(object, item){object[item.name] = item.value; return object;}, {});
		if (values[this.model.get("id")]) {
			values["answeredOn"] = Date.now();
		}
		this.model.set({"answer" : values});
		this.model.save(values, {
			success: function(){
				this._superSection.next();
			}.bind(this),
			error : function(){
				App.application.showMessage("ERROR")
			}.bind(this)
		});
	}
	
});