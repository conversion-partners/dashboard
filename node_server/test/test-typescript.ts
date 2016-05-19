var test = require('tape');
// test objects
import Configurator = require('../src/config/config');
import product = require('../src/product');



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

async function main() {
 await ping();
}

async function ping() {
 for (var i = 0; i < 10; i++) {
  await delay(300);
  console.log("ping");
 }
}

function delay(ms: number) {
 return new Promise(resolve => setTimeout(resolve, ms));
}

main();