"use strict";
var root = require("ts-npm-module");
var foo = root.foo;
var Bar = root.Bar;
var bas = root.bas;
var http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World" + bas);
    response.end();
}).listen(8888);
