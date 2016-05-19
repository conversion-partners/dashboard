"use strict";
var test = require('tape');
// test objects
var product = require('./product');
test('timing test', function (t) {
    t.plan(2);
    t.equal(typeof Date.now, 'function');
    var start = Date.now();
    var prod = new product.Product();
    prod.getPrice();
    var tmmmmp = prod.isAcceptable("dsafdsf");
    setTimeout(function () {
        t.equal(Date.now() - start, 100);
    }, 100);
});
//# sourceMappingURL=test-typescript.js.map