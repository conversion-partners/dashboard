let test = require('tape');

import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";








async function main() {

    let goodAccountPath = "/var/www/dashboard/data/accounts";

    let config = kernel.get<IConfig>(TYPES.Config);
    config.setConfigFile('/var/www/dashboard/node_server/test/test-sos-config-configfile.json');
    let configObj = await config.getConfigObj();
    let accountPathFromAll = configObj['path']['account'];
    let accountPathFromAccountPath = await config.getAccountPath();

    console.log(configObj);
    console.log(accountPathFromAll);
    console.log(goodAccountPath);
    console.log(accountPathFromAccountPath);

    test('account path test', function (t) {
        //t.plan(2);
        t.equal(goodAccountPath, accountPathFromAll);
        t.equal(goodAccountPath, accountPathFromAccountPath);
        t.end();
    });

}



main();