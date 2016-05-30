/// <reference path="../interfaces.d.ts" />

import fs = require('fs');

import {  inject, named } from "inversify";
import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.FileAccountService, "not-throwable")
class FileAccountService implements IAccountService {

    private _dataFile: string;
    private _domain: string;
    private _accountDb: IAccountDB;

    public setDomain(domain: string) {
        this._domain = domain;
    }

    private async getAccountFromDb(): Promise<IAccount> {
        let _accountDb = await this.getAccountDb();
        //if (err) reject(err);
        class Tmp implements IAccount {
            public domain: string;
            public account: string;
        }
        let temp = new Tmp();
        return temp;
    }

    private async getAccount(): Promise<IAccount> {
        let temp = await this.getAccountFromDb();
        return new Promise<IAccount>(function (resolve, reject) {
            resolve(temp);
        });
    }

    public setConfigObject(configObject: IAccountServiceJSON): void {
        this._dataFile = configObject.dataFile;
    }
    private async getAccountDb(): Promise<IAccountDB> {
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
