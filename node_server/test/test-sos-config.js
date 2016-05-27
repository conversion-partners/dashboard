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
        let goodBaseAccountPath = "/var/www/dashboard/data/accounts";
        let config = kernel_1.kernel.get(types_1.default.Config);
        config.setKernel(kernel_1.kernel);
        config.setConfigFile('/var/www/dashboard/node_server/test/test-sos-config-configfile.json');
        let baseAccountPath = yield config.getBaseAccountPath();
        test('base account path test', function (t) {
            t.equal(goodBaseAccountPath, baseAccountPath);
            t.end();
        });
        config.setRequestUrl('http://www.shop-online-shop.nl/nl/winkels');
        let goodAccountPath = "/var/www/dashboard/data/accounts/sos";
        let accountPath = yield config.getAccountPath();
        console.log(accountPath);
        test('account path test', function (t) {
            t.equal(goodAccountPath, accountPath);
            t.end();
        });
    });
}
main();
//# sourceMappingURL=test-sos-config.js.map