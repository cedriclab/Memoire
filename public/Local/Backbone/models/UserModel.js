window.Namespace.UserModel = Backbone.Model.extend({

	urlRoot : "/user",

	questionsAnwered : {},

	startAnswering : function(index){
		if (!this.questionsAnwered[String(index)]) {
			this.questionsAnwered[String(index)] = [];
		}
		this.questionsAnwered[String(index)].push({start: Date.now(), finish : null, answered: false});
	},

	stopAnswering : function(index, answered){
		console.log(index+" "+answered)
		var qa = this.questionsAnwered[String(index)];
		qa[qa.length-1]["finish"] = Date.now();
		qa[qa.length-1]["answered"] = Boolean(answered);
	},

	hasAnswered : function(index){
		if (this.questionsAnwered[String(index)]) {
			for (var i=0; i<this.questionsAnwered[String(index)].length; i++) {
				if (this.questionsAnwered[String(index)][i]["answered"]) {
					return true;
				}
			}
		} 
		return false;
	},

	isDone : function(){
		/*if (App.gameView && App.gameView.collection) {
			for (var j=0; j<App.gameView.collection.models.length; j++) {
				if (!this.hasAnswered(j+1)) {
					console.log(j+1);
					return false;
				} 
			}
			return true;
		} 
		return false;*/
        return true;
	}

});