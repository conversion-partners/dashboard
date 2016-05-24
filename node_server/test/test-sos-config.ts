let test = require('tape');

import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";








async function main() {
    //await ping();
    let config = kernel.get<IConfig>(TYPES.Config);
    config.setConfigFile('/var/www/dashboard/node_server/test/test-sos-config-configfile.json');

    let configObj = await config.getConfigObj();
    let accountPath = configObj['path']['account'];
    console.log(configObj);
    console.log(accountPath);
    let goodAccountPath = "/var/www/dashboard/data/accounts";
    console.log(goodAccountPath);

    test('account path test', function (t) {
        //t.plan(2);
        t.equal(goodAccountPath, accountPath);
        t.end();
    });

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