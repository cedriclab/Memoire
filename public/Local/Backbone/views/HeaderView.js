window.Namespace.HeaderView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["HeaderView"];
	},
	
	events : {
		"click #instructions-again" : "viewInstructions"
	},
	
	tagName : "header",
	
	render : function(options){
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.find(".timer").hide();
		this.setScore(this.model.get("balance") || Constants.START_BUDGET || 0);
		return this;
	},
	
	fill : function(content){
		this.$el.empty().append(content);
	},

	setScore : function(score){
		console.log("SETTING SCORE");
		console.log(score);
		this.$el.find("#score-holder").html(String(score || 0));
	},

	updateTime : function(){
		var now = Date.now();
		var delta = now - App.userModel.get("gameStartTime");

		if (delta < 1800000) {
			var minutes = parseInt(delta/60000);
			var seconds = parseInt((delta%60000)/1000);
			seconds = seconds > 9 ? seconds : "0"+seconds;

			this.$el.find("#time-holder").html(String(minutes+":"+seconds));
		} else {
			this.stopPlayTimer();
			App.application.beginPersonal();
		}

		
	},

	startPlayTimer : function(){
		this.$el.find(".timer").show();
		this._gameTimer = setInterval(this.updateTime.bind(this), 1000);
	},

	viewInstructions : function(){
		App.reInstructionView = new Namespace.ExplanationView({superSection : App.gameView, onDone : "shut"});
		App.gameView.$el.find('[data-anchor="Resource"]').first().empty().append(App.reInstructionView.render().el);
	},

	stopPlayTimer : function(){
		this.$el.find(".timer").hide();
		clearInterval(this._gameTimer);
		delete this._gameTimer;
	},
	
});