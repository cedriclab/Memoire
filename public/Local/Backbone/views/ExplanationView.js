window.Namespace.ExplanationView = Backbone.View.extend({
	
	initialize : function(options){
		options = options || {};
		this.template = Templates["ExplanationView"];
		this.onDone = options.onDone || "goToGame";
		this.superSection = options.superSection;
		this.sectionCount = 0;
		this.sectionIndex = 0;
	},

	events : {
		"click #understood" : "done",
		"click #explanation-next" : "next",
		"click #explanation-prev" : "prev"
	},

	className : "container",

	close : function(){
		this.undelegateEvents();
		this.unbind();
	},
	
	render : function(options){
		this.$el.html(this.template());
		this.delegateEvents();
		this.sectionCount = this.$el.find(".explanation-bit").length;
		this.goToExplanation(this.sectionIndex);
		return this;
	},

	goToExplanation : function(index){
		index = index || 0;
		this.$el.find(".explanation-bit").hide();
		this.$el.find(".explanation-bit:eq("+index+")").show();
		this.sectionIndex = index;

		if (!this.sectionIndex) {
			this.$el.find("#explanation-prev").attr("disabled", "disabled");
			this.$el.find("#understood").hide();
		} else if (this.sectionIndex < this.sectionCount-1) {
			this.$el.find("#explanation-prev").removeAttr("disabled");
			this.$el.find("#explanation-next").removeAttr("disabled");
			this.$el.find("#understood").hide();
		} else if (this.sectionIndex == this.sectionCount-1) {
			this.$el.find("#explanation-next").attr("disabled", "disabled");
			this.$el.find("#understood").show();
		}
	},

	next : function(){
		if (this.sectionIndex < this.sectionCount) {
			this.goToExplanation(this.sectionIndex+1);
		} 
	},

	prev : function(){
		if (this.sectionIndex) {
			this.goToExplanation(this.sectionIndex-1);
		}
	},

	done : function(event){
		this[this.onDone]();
	},

	goToGame : function(index){
		App.application.next();
	},

	close : function(){

	}
	
});