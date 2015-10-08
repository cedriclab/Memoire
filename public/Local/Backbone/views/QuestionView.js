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
		this.model.beginQuestion();
		this.$el.html(this.template(this.model.toJSON()));
		this.delegateEvents();
		return this;
	},

	getValue : function(){
		var $form = this.$el.find("#question-form");
		console.log($form.serializeArray());

		var value = null;
		if (this.model.get("answerForm")=="text") {
			var values = $form.serializeArray().reduce(function(object, item){object[item.name] = item.value; return object;}, {});
			if (values[this.model.get("id")]) {
				value = String(values[this.model.get("id")]);
			}
		} else if (this.model.get("answerForm")=="select") {
			$form.serializeArray().forEach(function(item){
				if (item.value=="on") {
					var id = (item.name || "").split("-");
					value = id[1] || null;
				}
			});
		} else if (this.model.get("answerForm")=="multi") {

		}
		//var values = $form.serializeArray().reduce(function(object, item){object[item.name] = item.value; return object;}, {});
		return value;
	},

	submit: function(event){
		
	/*
		if (values[this.model.get("id")]) {
			values["answeredOn"] = Date.now();
		}
	*/
		//this.model.set({"answer" : values});
		var values = this.getValue();
		this.model.set({"answer" : values}); 
		this.model.save({"answer" : values}, {
			success: function(){
				App.headerView.setScore(this.model.get("balance") || 0);
				this._superSection.next();
			}.bind(this),
			error : function(){
				App.application.showMessage("ERROR")
			}.bind(this)
		});
	}
	
});