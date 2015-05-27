File = {
	scheme : {},
	server : {},
	port : {},
	db : {},
	collection : {},
	collectionUrl : {},
	headers : {},
	body : {},
	config : function(config) {
		File.scheme = config.scheme;
		File.server = config.server;
		File.port = config.port;
		File.db = config.db;
		File.collection = config.collection;
		File.collectionUrl = config.db + "/" + config.collection;
	},
	check : function() {
		return "OK";
	},
	setHeaders : function(headers) {
		File.headers = headers;
	},
	setBody : function(body) {
		File.body = body;
	},
	get : function(params) {
		Core9.multiImport(
				[ 'app/elements/core9-file/js/base64' ]).then(
				function(modules) {
					var Base64 = Core9.unwrapModule(modules[0]);
					console.log(params);



	                // create XMLHttpRequest object, adding few event listeners, and POSTing our data
	                var oXHR = new XMLHttpRequest();


	                oXHR.onreadystatechange = function() {
	                    if (oXHR.readyState == 4) {
	                        console.log(oXHR.responseText);
	                        console.log(JSON.parse(oXHR.responseText));
	                    }
	                    return JSON.parse(oXHR.responseText);
	                }

	                oXHR.open('GET', 'http://192.168.1.71:8080/testdb/mybucket.files/?'+params, true);
	                oXHR.setRequestHeader("Authorization", "Basic " + Base64.encode("admin" + ":" + "changeit"));
	                oXHR.send();



				});
	},
	collectionExists : function() {
		return true;
	}

};

export
{
	File
}