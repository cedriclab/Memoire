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
                console.log($this.prop("checked"));
                if ($this.prop("checked")) {
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
        console.log(values);
		//var values = $form.serializeArray().reduce(function(object, item){object[item.name] = item.value; return object;}, {});
		return values;
	},

	submit : function(event){
        var vals = this.getValues();
		var values = Object.keys(vals).map(function(valKey){
            return {"key" : valKey, "value" : vals[valKey]};
        });
		App.userModel.set("personalInfo", values);
		App.application.next();
	}

	
});