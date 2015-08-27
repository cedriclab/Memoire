window.Namespace.HeaderView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["HeaderView"];
	},
	
	tagName : "header",
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.find(".timer").hide();
		this.setScore(0);
		return this;
	},
	
	fill : function(content){
		this.$el.empty().append(content);
	},

	setScore : function(score){
		this.$el.find("#score-holder").html(String(score || 0));
	},

	updateTime : function(){
		var now = Date.now();
		var delta = now - App.userModel.get("gameStartTime");
		var minutes = parseInt(delta/60000);
		var seconds = parseInt((delta%60000)/1000);
		seconds = seconds > 9 ? seconds : "0"+seconds;

		this.$el.find("#time-holder").html(String(minutes+":"+seconds));
	},

	startPlayTimer : function(){
		this.$el.find(".timer").show();
		this._gameTimer = setInterval(this.updateTime.bind(this), 1000);
	},

	stopPlayTimer : function(){
		this.$el.find(".timer").hide();
		clearInterval(this._gameTimer);
		delete this._gameTimer;
	},
	
});