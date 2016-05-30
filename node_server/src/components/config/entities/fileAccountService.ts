/// <reference path="../interfaces.d.ts" />

import fs = require('fs');

import {  inject, named } from "inversify";
import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.FileAccountService, "not-throwable")
class FileAccountService implements IAccountService {

    private _dataFile: string;
    private _domain: string;

    public setDomain(domain: string) {
        this._domain = domain;
    }
    
    public setConfigObject(configObject: IAccountServiceJSON):void{
        
    }
    
    public async setDataFile(dataFile: string) {
        this._dataFile = dataFile;
    }
    public async getAccount(): Promise<IAccount> {
        let _dataFile = this._dataFile;
        return new Promise<IAccount>(function (resolve, reject) {
            fs.readFile(_dataFile, 'utf8', function (err, data) {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
        });
    }
}



export default FileAccountService;
