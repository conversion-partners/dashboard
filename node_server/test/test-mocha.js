/// <reference path="/var/www/dashboard/node_server/typings/mocha/mocha.d.ts" />
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var tester = "tesadsft";
expect(tester).to.not.equal('bar');
describe('products', function () { });
console.log(tester);
/*

/// <reference path="../typings/mocha/mocha.d.ts" />
describe('products', function () {
  it('getType() should return 0 if no number is passed in', function () {
    var tmp = "test";
    console.log(tmp);
  });

  it('getType() should return 0 if no number is passed in', function () {
  var tmp = "test";
    console.log(tmp);
  });

});
*/ 
//# sourceMappingURL=test-mocha.js.map