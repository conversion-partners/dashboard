let test = require('tape');
/*
import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";
*/
import AppFactory from "../src/components/config/entities/appFactory";

async function main() {

    let appFactory = new AppFactory(__dirname+'/../config/config.json');
    appFactory.setConfigFile(__dirname+'/test-sos-config.json');
    let app = appFactory.getConfigObject();

    let baseAccountPath = await app.getBaseAccountPath();
    let goodBaseAccountPath = "/var/www/dashboard/data/accounts";
    test('base account path test', function (t) {
        t.equal(goodBaseAccountPath, baseAccountPath);
        t.end();
    });

    app.setRequestUrl('http://www.shop-online-shop.nl/nl/winkels');
    let goodAccountPath = "/var/www/dashboard/data/accounts/sos";
    let accountPath = await app.getAccountPath();
    console.log(accountPath);
    test('account path test', function (t) {
        t.equal(goodAccountPath, accountPath);
        t.end();
    });

}



main();