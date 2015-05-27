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
				[ '../../../../bower_components/restful.js/dist/restful.min',
						'app/elements/core9-file/js/base64' ]).then(
				function(modules) {
					var rest = modules[0];
					var Base64 = Core9.unwrapModule(modules[1]);
					console.log(params);
					console.log(rest);


					var api = rest(File.server)
				    .header("Authorization", "Basic " + Base64.encode("admin" + ":" + "changeit"))
				    .protocol(File.port)
				    .port(8080);

					var fileCollection = api.all(File.collectionUrl);

					fileCollection.getAll().then(function(response) {
					    var fileEntities = response.body();

					    fileEntities.forEach(function(commentEntity) {
					        var file = fileEntity.data();
					        console.log(file.body);
					    })
					});




				});
	},
	collectionExists : function() {
		System.import(
				'../../../../bower_components/restful.js/dist/restful.min')
				.then(
						function(m) {
							// console.log('import ...');
							// console.log(m);
							var api = m(File.server, File.port);
							// console.log(api);
							api.one(File.collectionUrl, 1).get().then(
									function(response) {
										// console.log(response);
									}, function(response) {
										// The reponse code is not >= 200 and <
										// 400
										// console.log(response);
										// throw new Error('Invalid response');
									});
						});
	}

};

export
{
	File
}