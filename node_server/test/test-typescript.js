"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var test = require('tape');
const product = require('../src/product');
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ping();
    });
}
function ping() {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < 10; i++) {
            yield delay(300);
            console.log("ping");
        }
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
main();
//# sourceMappingURL=test-typescript.js.map