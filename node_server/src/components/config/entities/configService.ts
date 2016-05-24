/// <reference path="../interfaces.d.ts" />

import fs = require('fs');

import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.ConfigService, "not-throwable")
class ConfigService implements IConfigService {

    private _configFile: string;

    public async setConfigFile(configFile: string) {
        this._configFile = configFile;
    }


    public async getConfigObj(): Promise<IConfigObject> {

        let _configFile = this._configFile;
        return new Promise<IConfigObject>(function (resolve, reject) {
            fs.readFile(_configFile, 'utf8', function (err, data) {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
        });
    }

    public async getAccountPath() {
        let configObj = await this.getConfigObj();
        return new Promise(function (resolve, reject) {
            resolve(configObj.path.account);
        });
    }
}



export default ConfigService;
