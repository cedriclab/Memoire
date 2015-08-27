window.Namespace.ResourcesView = Backbone.View.extend({
	
	initialize : function(options){
		options = options || {};
		this.template = Templates["ResourcesView"];
		this._superSection = options.superSection;
	},

	events : {
		"click .resource-link" : "view"
	},

	close : function(){
		this.undelegateEvents();
		this.unbind();
	},
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		console.log(this.model.toJSON());
		this.delegateEvents();
		return this;
	},

	view : function(event){
		this._superSection.showLink($(event.target).data("url"), this._superSection);
		this._superSection.linkOpened($(event.target).data("url"));
	},


	
});