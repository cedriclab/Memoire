window.Namespace.QuestionView = Backbone.View.extend({
	
	initialize : function(options){
		options = options || {};
		this.template = Templates["QuestionView"];
		this._superSection = options.superSection;
	},

	className : "container",

	events : {
		"click #submit" : "submit",
        "change #question-form input" : "toggleButton",
        "keypress #question-form input" : "toggleButton"
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
    
    getQuestionText : function(){
        var str = this.model.get("text") || "";
        if (this.model.get("additionalInfoKey") && App.userModel.get(this.model.get("additionalInfoKey"))) {
            var params = App.userModel.get(this.model.get("additionalInfoKey")) || [];
            params = Array.isArray(params) ? params : [params];
            
            return str.split('%s').map(function(s, i){return s+(params[i] || "");}).join('');
        }
        return str;
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
			$form.find('input').each(function(){
				var $this = $(this);
				if ($this.prop("checked")) {
					value = $this.attr("id");
				}
			});
        } else if (this.model.get("answerForm")=="text-multiple") {    
            value = $form.serializeArray().reduce(function(object, item){object[item.name.split('-')[1]] = item.value; return object;}, {});
		} else if (this.model.get("answerForm")=="select-multi") {

		}
		//var values = $form.serializeArray().reduce(function(object, item){object[item.name] = item.value; return object;}, {});
		return value;
	},
    
    toggleButton : function(event){
        this.$el.find("#submit").attr("disabled", "disabled");
        if (this.getValue()) {
            this.$el.find("#submit").removeAttr("disabled");
        }
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
                if (this.model.get("additionalInfo")) {
                    App.userModel.set(this.model.get("additionalInfo").key, this.model.get("additionalInfo").value);
                }
				this._superSection.next();
			}.bind(this),
			error : function(){
				App.application.showMessage("ERROR")
			}.bind(this)
		});
	}
	
});