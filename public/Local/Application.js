window.Namespace.Application = function(context){
	
	this._init = function(context){
		this._context = context;
	};
	
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
			this._context.userModel.save(null, {
				success : function(){
					document.cookie = "id="+this._context.userModel.id;
					this._context.headerView = new Namespace.HeaderView({model : this._context.userModel});
					this._context.mainView = new Namespace.MainView({model : this._context.userModel});
					$(document.body).append(this._context.headerView.render().el).append(this._context.mainView.render().el);
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