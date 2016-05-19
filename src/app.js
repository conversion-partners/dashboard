"use strict";
const root = require("ts-npm-module");
var foo = root.foo;
var Bar = root.Bar;
var bas = root.bas;
console.log(bas);
var para = document.createElement("p");
var node = document.createTextNode(bas);
document.getElementById("root").appendChild(node);
console.log(foo);
//# sourceMappingURL=app.js.map