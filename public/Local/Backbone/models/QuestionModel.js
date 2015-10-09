window.Namespace.QuestionModel = Backbone.Model.extend({

	urlRoot : "/question",

	realURLRoot : "/question",

	useLink : function(linkID){
		this.urlRoot = "/question/resource";
		this.save({"resourceID" : linkID});
		this.urlRoot = String(this.realURLRoot);
	},
    
    useAdvice : function(callback){
		this.urlRoot = "/question/advice";
		this.fetch({
            data : {"questionIndex" : this.get("index")},
            success : function(){
                callback();
            },
            error : function(){
                callback();
            },
        });
		this.urlRoot = String(this.realURLRoot);
	},
    
    useData : function(){
		this.urlRoot = "/question/data";
		this.save({"questionIndex" : this.get("index")});
		this.urlRoot = String(this.realURLRoot);
	},

	beginQuestion : function(){
		this.urlRoot = "/question/begin";
		this.save(null);
		this.urlRoot = String(this.realURLRoot);
	}

});