/// <reference path="../typings/mocha/mocha.d.ts" />
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Configurator = require('./../src/config/config');

var tester = "test";

console.log(tester);

describe('products', function () {
  it('getType() should return 0 if no number is passed in', function () {
    var config = new Configurator();

    expect(config.getType().to.equal("server"));
  });

  it('getType() should return 0 if no number is passed in', function () {
    var config = new Configurator("server");

    //test

    expect(config.getType().to.equal("server"));
  });

});
