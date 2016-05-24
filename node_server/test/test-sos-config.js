"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
let test = require('tape');
const kernel_1 = require("../src/components/config/config/kernel");
const types_1 = require("../src/components/config/constants/types");
require("../src/components/config/config/wiring");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //await ping();
        let config = kernel_1.kernel.get(types_1.default.Config);
        config.setConfigFile('/var/www/dashboard/node_server/test/test-sos-config-configfile.json');
        let configObj = yield config.getConfigObj();
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
    });
}
function ping() {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < 10; i++) {
            yield delay(300);
            console.log("ping");
        }
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
main();
//# sourceMappingURL=test-sos-config.js.map