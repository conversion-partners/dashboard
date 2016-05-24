/// <reference path="../interfaces.d.ts" />

import fs = require('fs');

import {  inject, named } from "inversify";
import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.ConfigService, "not-throwable")
class ConfigService implements IConfigService {

    private _configFile: string;
    private _requestUrl: string;
    private _urlStrategy: IUrlStrategy;
    
   
    public constructor(
        @inject(TYPES.UrlStrategy) @named("not-throwable") urlStrategy: IUrlStrategy
    ) {
        this._urlStrategy = urlStrategy;
    }
    
    public async setConfigFile(configFile: string) {
        this._configFile = configFile;
    }
    public async setRequestUrl(url: string) {
        this._urlStrategy.setRequestUrl(url);
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

    public async getBaseAccountPath() {
        let configObj = await this.getConfigObj();
        return new Promise(function (resolve, reject) {
            resolve(configObj.path.account);
        });
    }

    public async getAccountPath() {
        let configObj = await this.getConfigObj();
        let urlStrategy = this._urlStrategy;
        return new Promise(function (resolve, reject) {
            resolve(configObj.path.account + "/" + urlStrategy.getAccount());
        });
    }
}



export default ConfigService;
