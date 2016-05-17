// tests/part1/cart-summary-test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Config = require('./../src/config/config');
describe('products', function () {
    it('getAll() should return 0 if no number is passed in', function () {
        var config = new Config("server");
        expect(config.getAll().to.equal(0));
    });
    it('getAll() should return 0 if no number is passed in', function () {
        var config = new Config(5);
        //test
        expect(config.getAll()).to.equal(0);
    });
});
//# sourceMappingURL=test-config.js.map