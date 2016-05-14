///<reference path='../typings/main.d.ts'/>
"use strict";
var http = require("http");
//var test = bs.foo;
var ns = require('ts-npm-module');
var bas = ns.bas;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World name : ' + bas + " rtest");
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
//# sourceMappingURL=server.js.map