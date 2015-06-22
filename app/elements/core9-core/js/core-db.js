if (typeof Core9 === 'undefined') {
	Core9 = {}
};

Core9.db = {
	__config : {
		// needs defaults of at least 3 chars
		protocol : 'http://',
		host : 'localhost',
		port : '8080',
		username : 'easydrain',
		password : 'changeit',
		db : 'easydrain',
		dburl : 'http://localhost:8080/easydrain/'
	},
	getDB : function(config) {
		for (var key in config) {
			  if (config.hasOwnProperty(key) && Core9.db.__config[key].length > 3) {
			    	Core9.db.__config[key] = config[key];
			  }
		}
		return this;
	},
	createCollection : function(collection, callback){
		Core9.db.__do('PUT',Core9.db.__config.dburl+collection).then(function(response) {
			  callback(response);
			}, function(error) {
				callback(error);
			});	
	},
	deleteCollection : function(collection, db, callback){
		var url = Core9.db.__config.protocol+Core9.db.__config.host+':'+Core9.db.__config.port+'/'+db+'/'+collection;
		Core9.db.__do('DELETE',url).then(function(response) {
			  callback(response);
			}, function(error) {
				callback(error);
			});	
	},
	getCollections : function(callback) {
		Core9.db.__do('GET',Core9.db.__config.dburl).then(function(response) {
		  callback(JSON.parse(response)._embedded['rh:coll']);
		}, function(error) {
		  console.error("Failed!");
		  console.error(error);
		});
	},
	__do : function(method, url, etag) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open(method, url);
			req.setRequestHeader("Content-Type", "application/hal+json; charset=utf-8");
			req.setRequestHeader("If-Match", etag); // to delete/put you need the etag of the to be deleted/updated resource!
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