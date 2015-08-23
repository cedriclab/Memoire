window.Namespace.Application = function(context){
	
	this._init = function(context){
		this._context = context;
	};
	
	this.loadTemplates = function(path, files, callback){
		console.log(files);
		console.log(path);

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

		//callback();
	};
	
	this.main = function(){
		this.loadTemplates(Constants.TEMPLATES_FOLDER, Constants.TEMPLATES_LIST, function(){
			this._context.router = new Backbone.Router();
			//this._context.router.start();
		}.bind(this));
		
		return 0; //just for the lolz
	};
	
	this._init(context);
};