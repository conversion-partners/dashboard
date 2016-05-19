"use strict";
var test = require('tape');
var product = require('../src/product');
test('timing test', function (t) {
    t.plan(2);
    t.equal(typeof Date.now, 'function');
    var start = Date.now();
    var prod = new product.Product();
    prod.getPrice();
    prod.getCategory();
    var tmmmmp = prod.isAcceptable("dsafdsf");
    setTimeout(function () {
        t.equal(Date.now() - start, 100);
    }, 100);
});
//# sourceMappingURL=test-typescript.js.map