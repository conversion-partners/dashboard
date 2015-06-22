if (typeof Core9 === 'undefined') {
	Core9 = {}
};

Core9.db = {
	__config : {
		protocol : 'http://',
		host : 'localhost',
		port : '8080',
		username : 'easydrain',
		password : 'changeit',
		db : 'easydrain',
		dburl : 'http://localhost:8080/easydrain/'
	},
	getDB : function() {
		return this;
	},
	getCollections : function(callback) {

		Core9.db.get(Core9.db.__config.dburl).then(function(response) {
		  console.log("Success!");
		  console.log(JSON.parse(response));
		}, function(error) {
		  console.error("Failed!");
		  console.error(error);
		});
		
	},
	get : function(url) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', url);
			req.setRequestHeader("Authorization", "Basic " + btoa(Core9.db.__config.username + ":" + Core9.db.__config.password));

			req.onload = function() {
				if (req.status == 200) {
					resolve(req.response);
				} else {
					reject(Error(req.statusText));
				}
			};
			req.onerror = function() {
				reject(Error("Network Error"));
			};
			req.send();
		});
	}
}
var DB = Core9.db;

export
{
	DB
}