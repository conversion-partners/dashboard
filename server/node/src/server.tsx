///<reference path='../../../server/node/typings/main/ambient/node/index.d.ts'/>
import http = require("http");

import * as root from "ts-npm-module";

var foo = root.foo;
var Bar = root.Bar;
var bas = root.bas;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World' + bas);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
