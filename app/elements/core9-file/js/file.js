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

		return Promise(function(resolve, reject) {
			var oXHR = new XMLHttpRequest();
			oXHR.onreadystatechange = function() {
				if (oXHR.readyState == 4) {
					// console.log(oXHR.responseText);
					// console.log(JSON.parse(oXHR.responseText));
					resolve(JSON.parse(oXHR.responseText));
				}
				// reject(error);
			}
			oXHR.open('GET', 'http://192.168.1.71:8080/testdb/mybucket.files/?'
					+ params, true);
			oXHR.setRequestHeader("Authorization", "Basic "
					+ btoa("admin" + ":" + "changeit"));
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