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
    
    getValues : function(){
		var $inputs = this.$el.find("#personal-form").find("input");

		var values = {};
		$inputs.each(function(){
            var $this = $(this);
            var id = $this.data("index");
            if ($this.data("multiple")) {
                if (!values[id]) {
                    values[id] = [];
                }
                if ($this.val()=="on") {
                    values[id].push($this.data("option"));
                }
            } else if ($this.data("option")) {
                if (!values[id]) {
                    values[id] = "";
                }
                if ($this.val()=="on") {
                    values[id] = $this.data("option");
                }
            } else {
                values[id] = String($this.val() || "");
            }
        });
        
		//var values = $form.serializeArray().reduce(function(object, item){object[item.name] = item.value; return object;}, {});
		return values;
	},

	submit : function(event){
		var values = this.getValues();
		App.userModel.set(values);
		App.application.next();
	}

	
});