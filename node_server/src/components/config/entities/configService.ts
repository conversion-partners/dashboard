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


    public async getAll() {

        let _configFile = this._configFile;
        return new Promise(function (resolve, reject) {
            fs.readFile(_configFile, 'utf8', function (err, data) {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
        });
    }

    public getAccountPath(): string {
        return "accountpath";
    }
}



export default ConfigService;
