File = {
	server : {},
	port : {},
	db : {},
	collection : {},
	collectionUrl : {},
	headers : {},
	body : {},
	config : function(config) {
		File.server = config.server;
		File.port = config.port;
		File.db = config.db;
		File.collection = config.collection;
		File.collectionUrl = config.db + config.collection;
	},
	check : function(){
		return "OK";
	},
	setHeaders : function(headers){
		File.headers = headers;
	},
	setBody : function(body){
		File.body = body;
	},
	sent : function(){
		System.import('../../../../bower_components/restful.js/dist/restful.min').then(function(m) {
			//console.log('import ...');
			//console.log(m);
			var api = m(File.server)
			//.header('AuthToken', 'test') // set global header
			.header('Content-Type','application/x-www-form-urlencoded')
		    .prefixUrl("testdb")
		    .protocol('http')
		    .port(File.port);
			//console.log(api);

			var files = api.all('mybucket.files');

			files.post(File.body [{'Content-Type':'application/x-www-form-urlencoded'}, File.headers['file']]).then(function(response) {
				console.log(response);
			}, function(response) {
				// The reponse code is not >= 200 and < 400
				console.log(response);
				// throw new Error('Invalid response');
			});
		});
	},
	collectionExists : function() {
		System.import('../../../../bower_components/restful.js/dist/restful.min').then(function(m) {
			//console.log('import ...');
			//console.log(m);
			var api = m(File.server, File.port);
			//console.log(api);
			api.one(File.collectionUrl, 1).get().then(function(response) {
				//console.log(response);
			}, function(response) {
				// The reponse code is not >= 200 and < 400
				//console.log(response);
				// throw new Error('Invalid response');
			});
		});
	}

};

export
{
	File
}