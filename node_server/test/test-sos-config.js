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
const appFactory_1 = require("../src/components/config/entities/appFactory");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let appFactory = new appFactory_1.default(__dirname + '/../config/config.json');
        appFactory.setConfigFile(__dirname + '/test-sos-config.json');
        let app = appFactory.getConfigObject();
        let baseAccountPath = yield app.getBaseAccountPath();
        let goodBaseAccountPath = "/var/www/sos-dashboard/data/accounts";
        app.setRequestUrl('http://www.shop-online-shop.nl/nl/winkels');
        let goodAccountPath = "/var/www/sos-dashboard/data/accounts/sos";
        let accountPath = yield app.getAccountPath();
        test('base account path test', function (t) {
            t.plan(2);
            t.equal(goodBaseAccountPath, baseAccountPath);
            t.equal(goodAccountPath, accountPath);
            t.end();
        });
    });
}
main();
//# sourceMappingURL=test-sos-config.js.map