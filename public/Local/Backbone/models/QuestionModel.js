window.Namespace.QuestionModel = Backbone.Model.extend({

	urlRoot : "/question",

	realURLRoot : "/question",

	useLink : function(linkID){
		this.urlRoot = "/question/resource";
		this.save({"resourceID" : linkID});
		this.urlRoot = String(this.realURLRoot);
	},

	beginQuestion : function(){
		this.urlRoot = "/question/begin";
		this.save(null);
		this.urlRoot = String(this.realURLRoot);
	}

});