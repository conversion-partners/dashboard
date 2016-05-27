let test = require('tape');

import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";


async function main() {

    let goodBaseAccountPath = "/var/www/dashboard/data/accounts";

    let config = kernel.get<IConfig>(TYPES.Config);
    config.setKernel(kernel);
    config.setConfigFile('/var/www/dashboard/node_server/test/test-sos-config-configfile.json');
    let baseAccountPath = await config.getBaseAccountPath();

    test('base account path test', function (t) {
        t.equal(goodBaseAccountPath, baseAccountPath);
        t.end();
    });

    config.setRequestUrl('http://www.shop-online-shop.nl/nl/winkels');
    let goodAccountPath = "/var/www/dashboard/data/accounts/sos";
    let accountPath = await config.getAccountPath();

    console.log(accountPath);


    test('account path test', function (t) {
        t.equal(goodAccountPath, accountPath);
        t.end();
    });

}



main();