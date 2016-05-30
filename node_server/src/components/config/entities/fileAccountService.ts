/// <reference path="../interfaces.d.ts" />

import fs = require('fs');

import {  inject, named } from "inversify";
import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.FileAccountService, "not-throwable")
class FileAccountService implements IAccountService {

    private _configFile: string;
    private _domain: string;

    public setDomain(domain: string){
        this._domain = domain;
    }
    

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

    public async getBaseAccountPath() {
        let configObj = await this.getConfigObj();
        return new Promise(function (resolve, reject) {
            resolve(configObj.path.account);
        });
    }

    public async getAccountPath() {
        let configObj = await this.getConfigObj();
        return new Promise(function (resolve, reject) {
            resolve(configObj.path.account + "/" + "... to be implemented");
        });
    }
}



export default FileAccountService;
