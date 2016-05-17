// tests/part1/cart-summary-test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Data = require('./../src/data-generation/data');

describe('products', function() {
  it('getAll() should return 0 if no number is passed in', function() {
    var data = new Data([]);
    expect(data.getAll()).to.equal(0);
  });

  it('getAll() should return 0 if no number is passed in', function() {
    var data = new Data(5);

    //test

    expect(data.getAll()).to.equal(0);
  });


});
