let test = require('tape');
/*
import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";
*/
import FileAccountService from "../src/components/config/entities/fileAccountService";

async function main() {


    let accountService = new FileAccountService();

    class ConfObject implements IAccountServiceJSON {
        public type: string;
        public dataFile: string;
    }

    let configObject = new ConfObject();
    configObject.type = "file";
    configObject.dataFile = "/asdfsdaf";

    accountService.setConfigObject(configObject);

    accountService.setDomain("http://www.sos.nl");

    let account = accountService.getAccount();
}
main();