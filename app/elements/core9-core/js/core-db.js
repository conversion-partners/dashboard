if (typeof Core9 === 'undefined') {
	Core9 = {}
};

Core9.db = {
     config : {
		protocol : 'http://',
		host : 'localhost',
		port : '8080',
		username : 'easydrain',
		password : 'test'
} 
}
var DB = Core9.db;

export
{
	DB
}