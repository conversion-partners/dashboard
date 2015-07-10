var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});


if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  console.log(req.url);

  if(req.url.startsWith("/dashboard")){
    proxy.web(req, res, { target: 'http://127.0.0.1:3000' });
  }else{
    proxy.web(req, res, { target: 'http://127.0.0.1:9999' });
  }




});

console.log("listening on port 9090")
server.listen(9090);
