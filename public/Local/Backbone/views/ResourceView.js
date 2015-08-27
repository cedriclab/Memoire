window.Namespace.ResourceView = Backbone.View.extend({
	
	initialize : function(options){
		options = options || {};
		this.template = Templates["ResourceView"];
		this._superSection = options.superSection;
		this._link = options.link;
	},

	events : {
		"click #close" : "closeResource"
	},

	close : function(){
		this.undelegateEvents();
		this.unbind();
	},
	
	render : function(options){
		console.log(this._link)
		this.$el.html(this.template({"link" : this._link}));
		this.delegateEvents();
		return this;
	},

	closeResource : function(event){
		console.log("close");
		this.$el.remove();
		this._superSection.closeLink();
	}
	
});