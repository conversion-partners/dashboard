let test = require('tape');

import FileAccountService from "../src/components/config/entities/fileAccountService";

async function main() {

    let accountService = new FileAccountService();
    class ConfObject implements IAccountServiceJSON {
        public type: string;
        public dataFile: string;
    }
    let configObject = new ConfObject();
    configObject.type = "file";
    configObject.dataFile = __dirname + "/config/accounts.json";
    accountService.setConfigObject(configObject);
    accountService.setDomain("www.sos.nl");
    let account = await accountService.getAccount();

    test('account equals sos', function (t) {
        t.equal(account.account, "sos");
        t.end();
    });

}
main();