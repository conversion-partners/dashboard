if (typeof Core9 === 'undefined') {
	Core9 = {}
};

Core9.db = {
    __axios : {},
	__config : {
		protocol : 'http://',
		host : 'localhost',
		port : '8080',
		username : 'easydrain',
		password : 'changeit',
		db : 'easydrain'
	},
	getDB : function(axios){
		this.__axios = axios;
		return this;
	},
	getCollections : function(callback){

	    var oXHR = new XMLHttpRequest();
	    oXHR.onreadystatechange=callback();
	    oXHR.open('GET', this.__config.protocol + this.__config.host +':'+ this.__config.port +'/'+ this.__config.db +'/', true);
	    oXHR.setRequestHeader("Authorization", "Basic "
	        + btoa(this.__config.username + ":" + this.__config.password));
	    oXHR.send();
	    
	    return oXHR.response;
	}
}
var DB = Core9.db;

export
{
	DB
}