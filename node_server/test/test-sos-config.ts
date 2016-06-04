let test = require('tape');

import AppFactory from "../src/components/config/entities/appFactory";

async function main() {

    let appFactory = new AppFactory(__dirname + '/config/config.json');
   
    let config = appFactory.getConfigObject();

    let baseAccountPath = await config.getBaseAccountPath();
    let goodBaseAccountPath = "/var/www/sos-dashboard/data/accounts";

    config.setRequestUrl('http://www.shop-online-shop.nl/nl/winkels');
    let goodAccountPath = "/var/www/sos-dashboard/data/accounts/sos";
    let accountPath = await config.getAccountPath();

    test('base account path test', function (t) {
        t.plan(2);
        t.equal(goodBaseAccountPath, baseAccountPath);
        t.equal(goodAccountPath, accountPath);
        t.end();
    });

}



main();