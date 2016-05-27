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
/*
import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";
*/
const configFactory_1 = require("../src/components/config/entities/configFactory");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let configFactory = new configFactory_1.default('/var/www/dashboard/node_server/config/config.json');
        configFactory.setConfigFile('/var/www/dashboard/node_server/test/test-sos-config-configfile.json');
        let config = configFactory.getConfigObject();
        let baseAccountPath = yield config.getBaseAccountPath();
        let goodBaseAccountPath = "/var/www/dashboard/data/accounts";
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