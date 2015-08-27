window.Namespace.ResourceCollection = Backbone.Collection.extend({

	url : "/resources",

	model : Namespace.ResourceModel,

	parse : function(data){
		return data.resources;
	}

})