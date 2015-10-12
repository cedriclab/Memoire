window.Namespace.Application = function(context){
	
	this._init = function(context){
		this._context = context;
		this._sectionIndex = 0;
		this._sections = ["welcome", "showExplanations", "beginWarmup", "beginGame", "beginPersonal", "thankYou"];
	};

	this.showMessage = function(message){
		console.log(message);
	},

	this.showLink = function(link, context){
		this._context.resourceView = new Namespace.ResourceView({link: link, superSection : context});
		this._context.resourceView.render();
	},

	this.next = function(){
		this[this._sections[++(this._sectionIndex)]]();
	},

	this.showExplanations = function(){
		this._context.explanationView = new Namespace.ExplanationView();
		this._context.mainView.fill(this._context.explanationView.render().el);
	},

	this.beginWarmup = function(){
		var now = Date.now();

		this._context.userModel.set("warmupStartTime", now);
		this._context.userModel.set("signedConsentForm", true);
		this._context.userModel.save(null, {
			success : function(){
				this._context.warmupView = new Namespace.WarmupQuestionView({collection : new Namespace.QuestionCollection()});
				this._context.warmupView.collection.fetch({
					data : {section : "warmup"},
					success : function(collection, response, opts){
						this._context.mainView.fill(this._context.warmupView.render().el);
						this._context.warmupView.goToQuestion(0);
					}.bind(this),
					error : function(collection, response, opts){
						this.showMessage("ERROR");
					}.bind(this),
				});
			}.bind(this),
			error : function(){
				this.showMessage("ERROR");
			}.bind(this)
		});
		
	},

	this.beginGame = function(){
		var now = Date.now();

		this._context.userModel.set("gameStartTime", now);
		this._context.headerView.startPlayTimer();

		this._context.userModel.save(null, {
			success : function(){
				this._context.gameView = new Namespace.GameQuestionView({collection : new Namespace.QuestionCollection()});
				this._context.gameView.collection.fetch({
					data : {section : "game"},
					success : function(collection, response, opts){
						this._context.mainView.fill(this._context.gameView.render().el);
						this._context.gameView.goToQuestion(0);
					}.bind(this),
					error : function(collection, response, opts){
						this.showMessage("ERROR");
					}.bind(this),
				});
			}.bind(this),
			error : function(){
				this.showMessage("ERROR");
			}.bind(this)
		});
		
	},

	this.beginPersonal = function(){
		var now = Date.now();

		this._context.userModel.set("gameFinishTime", now);
		this._context.headerView.stopPlayTimer();
		
		this._context.userModel.save(null, {
			success : function(){
				this._context.personalView = new Namespace.PersonalQuestionView({collection : new Namespace.QuestionCollection()});
				this._context.personalView.collection.fetch({
					data : {section : "personal"},
					success : function(collection, response, opts){
						this._context.mainView.fill(this._context.personalView.render().el);
					}.bind(this),
					error : function(collection, response, opts){
						this.showMessage("ERROR");
					}.bind(this),
				});
			}.bind(this),
			error : function(){
				this.showMessage("ERROR");
			}.bind(this)
		});
		
	},
		
	this.thankYou = function(){
		this._context.userModel.save(null, {
			success : function(){
				this._context.thankYouView = new Namespace.ThankYouView();
				this._context.mainView.fill(this._context.thankYouView.render().el);
			}.bind(this),
			error : function(){
				this.showMessage("ERROR");
			}.bind(this)
		});
	},
	
	this.loadTemplates = function(path, files, callback){
		var count = Number(files.length || 0);
		var localLoader = function(index){
			if (index < count) {
				$.ajax({
					url : path+"/"+files[index]+".html",
					method: "GET",
					success : function(data, response, options){
						window.Templates[files[index]] = _.template(data);
						localLoader(++index);
					},
					error : function(data, response, options){
						window.Templates[files[index]] = _.template("");
						console.log("Impossible to load template for "+files[index]+".");
						localLoader(++index);
					}
				});
			} else {
				callback();
			}
		};
		localLoader(0);
	};
	
	this.main = function(){
		this.loadTemplates(Constants.TEMPLATES_FOLDER, Constants.TEMPLATES_LIST, function(){
			this._context.router = new Backbone.Router();
			this._context.userModel = new Namespace.UserModel();
			if (document.cookie) {
/*
                var userID =  document.cookie.replace(/id=/g, '');
				console.log(userID);
				this._context.userModel.set({"id" : userID});
*/
				document.cookie = document.cookie + "; expires="+(new Date(0)).toUTCString()+";";
			}
			this._context.userModel.save(null, {
				success : function(){
					document.cookie = "id="+this._context.userModel.id;
					this._context.headerView = new Namespace.HeaderView({model : this._context.userModel});
					this._context.mainView = new Namespace.MainView({model : this._context.userModel});
					this._context.welcomeView = new Namespace.WelcomeView({model : this._context.userModel});

					$(document.body).append(this._context.headerView.render().el).append(this._context.mainView.render().el);
					this._context.mainView.fill(this._context.welcomeView.render().el);
				}.bind(this),
				error : function(){
					console.error("ERROR");
				}.bind(this)
			});
		}.bind(this));
		
		return 0; //just for the lolz
	};
	
	this._init(context);
};