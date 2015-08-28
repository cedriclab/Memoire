window.Namespace.GameQuestionView = Backbone.View.extend({
	
	initialize : function(options){
		this.template = Templates["GameQuestionView"];
		this.questionIndex = 0;
	},

	events : {
		"click #previous-question" : "p",
		"click #next-question" : "n",
		"click a[data-questionindex]" : "goTo"
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

	fillQuestion : function(content){
		this.$el.find('[data-anchor="Question"]').first().empty().append(content);
	},

	fillResources : function(content){
		this.$el.find('[data-anchor="Resources"]').first().empty().append(content);
	},

	goToQuestion : function(index){
		console.log(index)

		if (!index) {
			this.$el.find("#previous-question").addClass("disabled");
		} else {
			this.$el.find("#previous-question").removeClass("disabled");
		}

		if (index == this.collection.models.length-1) {
			this.$el.find("#next-question").addClass("disabled");
		} else {
			this.$el.find("#next-question").removeClass("disabled");
		}
		
		if (index && App.currentQuestionView.model.get("section")=="game") {
			App.userModel.stopAnswering(App.currentQuestionView.model.get("index"), Boolean(App.currentQuestionView.model.get("answer") && App.currentQuestionView.model.get("answer")[App.currentQuestionView.model.get("id")]));
		}

		if (index < this.collection.models.length) {
			var nominalIndex = String(index+1);
			this.$el.find('a[data-questionindex]').each(function(){
				var $this = $(this);
				var $li = $this.parents('li').first();
				$li.removeClass("active").removeClass("teal");
				if ($this.data("questionindex")==String(index)) {
					$li.addClass("active");
				} else if (App.userModel.hasAnswered(Number($this.data("questionindex") || 0)+1)) {
					$li.addClass("teal");
				}
			});

			var model = this.collection.where({"index" : nominalIndex})[0];
			if (model) {
				App.userModel.startAnswering(nominalIndex);
				App.currentQuestionView = new Namespace.QuestionView({model : model, superSection : this});
				App.currentResourcesView = new Namespace.ResourcesView({model : model, superSection : this});
				this.fillQuestion(App.currentQuestionView.render().$el.removeClass("container").get(0));
				this.fillResources(App.currentResourcesView.render().el);
				
				this.questionIndex = index;
			} else {App.application.showMessage("oops");}
		} else if (App.userModel.isDone()) {
			App.application.next();
		}
	},
	
	n : function(){
		if (this.questionIndex <= this.collection.models.length) {
			this.next();
		}
	},
	
	p : function(){
		if (this.questionIndex) {
			this.previous();
		}
	},

	next : function(){
		this.goToQuestion(++(this.questionIndex));
	},

	previous : function(){
		this.goToQuestion(--(this.questionIndex));
	},

	goTo : function(event){
		this.goToQuestion(Number($(event.target).closest("a[data-questionindex]").data("questionindex") || 0));
	},

	linkOpened : function(linkID){
		console.log(linkID);
	},

	closeLink : function(){
		
	},

	showLink : function(link){
		App.resourceView = new Namespace.ResourceView({link: link, superSection : this});
		this.$el.find('[data-anchor="Resource"]').first().empty().append(App.resourceView.render().el);
	},
	
	
});