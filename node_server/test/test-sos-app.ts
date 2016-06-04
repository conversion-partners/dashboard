let test = require('tape');

import AppFactory from "../src/components/config/entities/appFactory";

async function main() {

    let appFactory = new AppFactory(__dirname + '/../config/config.json');
    appFactory.setConfigFile(__dirname + '/test-sos-config.json');
    let app = appFactory.getApp();



    test('base account path test', function (t) {
        t.plan(2);
        t.end();
    });

}



main();