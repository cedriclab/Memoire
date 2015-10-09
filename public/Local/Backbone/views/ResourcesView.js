window.Namespace.ResourcesView = Backbone.View.extend({
	
	initialize : function(options){
		options = options || {};
		this.template = Templates["ResourcesView"];
		this._superSection = options.superSection;
		console.log(this._superSection)
	},

	events : {
		"click .resource-link" : "view",
		"click .resource-advice" : "viewAdvice",
        "click .resource-data" : "viewData"
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
		//this._superSection.showLink($(event.target).data("url"), this._superSection);
		//this._superSection.linkOpened($(event.target).data("url"));

		this.model.useLink($(event.target).data("resource"));
		window.open($(event.target).data("url"), "_blank");
	},

	viewAdvice : function(event){
		this.model.useAdvice(function(){
            console.log(this.model.get("adviceText"));
            App.gameView.$el.find('[data-anchor="Resource"]').first().empty().append('<h3>Conseil d\'expert</h3><p class="flow-text">'+this.model.get("adviceText")+'</p>');
            if (this.model.get("newBalance")) {
                App.headerView.setScore(this.model.get("newBalance").toFixed(2));
            }
        }.bind(this));
	},
    
    viewData : function(event){
		this.model.useData();
		window.open($(event.target).data("url"), "_blank");
	}
	
});