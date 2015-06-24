if (typeof Core9 === 'undefined') {
	Core9 = {}
};

Core9.db = {
	__guid : function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16)
					.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
				+ s4() + s4();
	},
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
		for ( var key in config) {
			if (config.hasOwnProperty(key) && Core9.db.__config[key].length > 3) {
				Core9.db.__config[key] = config[key];
			}
		}
		return this;
	},
	__do : function(method, url, etag, data) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open(method, url);
			req.setRequestHeader("Content-Type",
					"application/hal+json; charset=utf-8");
			req.setRequestHeader("If-Match", etag); // to delete/put you
			// need
			// the etag of the to be
			// deleted/updated resource!
			req.setRequestHeader("Authorization", "Basic "
					+ btoa(Core9.db.__config.username + ":"
							+ Core9.db.__config.password));
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
			if (typeof data === 'undefined' || data == null) {
				req.send();
			} else {
				req.send(JSON.stringify(data));
			}

		});
	},
	collection : {

		doc : {
			remove : function(collection, id, data, callback) {
				var etag = null;
				Core9.db.__do('GET',
						Core9.db.__config.dburl + collection + '/' + id, etag,
						data).then(
						function(response) {
							etag = JSON.parse(response)._etag.$oid;
							Core9.db.__do(
									'DELETE',
									Core9.db.__config.dburl + collection + '/'
											+ id, etag, data).then(
									function(response) {
										callback(response);
									}, function(error) {
										callback(error);
									});

						}, function(error) {
							callback(error);
						});

			},
			getAll : function(collection, callback) {
				Core9.db.collection.get(collection, function(data) {
					callback(JSON.parse(data)._embedded['rh:doc']);
				});
			},
			patch : function(collection, id, data, callback) {
				if (typeof id === 'undefined' || id == null) {
					console.log("try to patch without id");
					return "";
				}
				var etag = null;
				data._id = id;
				Core9.db.__do('GET',
						Core9.db.__config.dburl + collection + '/' + id, etag,
						data).then(
						function(response) {
							etag = JSON.parse(response)._etag.$oid;
							Core9.db.__do(
									'PATCH',
									Core9.db.__config.dburl + collection + '/'
											+ id, etag, data).then(
									function(response) {
										callback(response);
									}, function(error) {
										callback(error);
									});

						}, function(error) {
							callback(error);
						});
			},
			put : function(collection, id, data, callback) {
				var etag = null;
				if (typeof id === 'undefined' || id == null) {
					id = Core9.db.__guid();
					data._id = id;
					Core9.db.__do('PUT',
							Core9.db.__config.dburl + collection + '/' + id,
							null, data).then(function(response) {
						callback(response);
					}, function(error) {
						callback(error);
					});
				}else{
					Core9.db.collection.doc.remove(collection, id, data,
							function() {
								Core9.db.__do('PUT',
										Core9.db.__config.dburl + collection + '/' + id,
										null, data).then(function(response) {
									callback(response);
								}, function(error) {
									callback(error);
								});
							});
				}



			}
		},
		get : function(collection, callback) {
			Core9.db.__do('GET', Core9.db.__config.dburl + collection).then(
					function(response) {
						callback(response);
					}, function(error) {
						callback(error);
					});
		},
		create : function(collection, callback) {
			Core9.db.__do('PUT', Core9.db.__config.dburl + collection).then(
					function(response) {
						callback(response);
					}, function(error) {
						callback(error);
					});
		},
		remove : function(collection, callback) {
			Core9.db.collection.get(collection, function(data) {
				Core9.db.__do('DELETE', Core9.db.__config.dburl + collection,
						JSON.parse(data)._etag.$oid).then(function(response) {
					callback(response);
				}, function(error) {
					callback(error);
				});
			});
		},
		getAll : function(callback) {
			Core9.db.__do('GET', Core9.db.__config.dburl).then(
					function(response) {
						callback(JSON.parse(response)._embedded['rh:coll']);
					}, function(error) {
						console.error("Failed!");
						console.error(error);
					});
		}
	}
}

var DB = Core9.db;

export
{
	DB
}