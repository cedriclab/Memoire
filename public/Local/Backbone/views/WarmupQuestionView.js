window.Namespace.WarmupQuestionView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["WarmupQuestionView"];
		this.questionIndex = 0;
	},

	close : function(){
		this.undelegateEvents();
		this.unbind();
	},
	
	render : function(options){
		this.$el.html(this.template(this.collection.toJSON()));
		this.delegateEvents();
		return this;
	},

	fill : function(content){
		this.$el.find('[data-anchor="WarmupQuestionView"]').first().empty().append(content);
	},

	goToQuestion : function(index){
		console.log(index)
		if (index < this.collection.models.length) {
			var model = this.collection.where({"index" : String(index+1)})[0];
			if (model) {
				App.currentQuestionView = new Namespace.QuestionView({model : model, superSection : this});
				this.fill(App.currentQuestionView.render().el);
			} else {App.application.showMessage("oops");}
		} else {
			App.application.next();
		}
	},

	next : function(){
		this.goToQuestion(++(this.questionIndex));
	}
	
});