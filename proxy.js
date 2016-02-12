var proxy = require('redbird')({port: 9090, bunyan: false});
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
console.log("config : ");
console.log(config);

proxy.register(config.hostname + ":9090/dashboard/", "http://" + config.hostname + ":3000/dashboard/");
proxy.register(config.hostname +":9090/dashboard", "http://" + config.hostname + ":3000/dashboard");
proxy.register(config.hostname +":9090/api/", "http://" + config.hostname + ":3000/api/");

proxy.register(config.hostname +":9090/auth/", "http://" + config.hostname + ":3000/auth/");

//proxy.register(config.hostname +":9090", "http://" + config.hostname + ":9999");
