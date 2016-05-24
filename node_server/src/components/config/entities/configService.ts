/// <reference path="../interfaces.d.ts" />

import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.ConfigService, "not-throwable")
class ConfigService implements IConfigService {

    private _configFile: string;
    private _configObj: Object;

    public async setConfigFile(configFile: string) {
        this._configFile = configFile;
        this._configObj = await JSON.parse(this._configFile);
    }

    public async getAll() {

        return new Promise(function (resolve, reject) {
            
                resolve("Stuff worked!");
           
        });
        //return this._configObj;
    }

    public getAccountPath(): string {
        return "accountpath";
    }
}



export default ConfigService;
