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
const fileAccountService_1 = require("../src/components/config/entities/fileAccountService");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let accountService = new fileAccountService_1.default();
        class ConfObject {
        }
        let configObject = new ConfObject();
        configObject.type = "file";
        configObject.dataFile = __dirname + "/config/accounts.json";
        accountService.setConfigObject(configObject);
        accountService.setDomain("www.sos.nl");
        let account = yield accountService.getAccount();
        test('account equals sos', function (t) {
            t.equal(account.account, "sos");
            t.end();
        });
    });
}
main();
//# sourceMappingURL=test-sos-account.js.map