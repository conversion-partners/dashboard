/// <reference path="../interfaces.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require('fs');
const kernel_1 = require("../config/kernel");
const types_1 = require("../constants/types");
const NodeURL = require('url');
let FileAccountService = class FileAccountService {
    setDomain(domain) {
        this._domain = NodeURL.parse(domain);
    }
    getAccountFromDb() {
        return __awaiter(this, void 0, Promise, function* () {
            let _accountDb = yield this.getAccountDb();
            let accountAlias = _accountDb["aliases"][this._domain.host];
            let account = _accountDb["accounts"][accountAlias];
            //if (err) reject(err);
            class Tmp {
            }
            let temp = new Tmp();
            temp.account = account["account"];
            return temp;
        });
    }
    getAccount() {
        return __awaiter(this, void 0, Promise, function* () {
            let temp = yield this.getAccountFromDb();
            return new Promise(function (resolve, reject) {
                resolve(temp);
            });
        });
    }
    setConfigObject(configObject) {
        this._dataFile = configObject.dataFile;
    }
    getAccountDb() {
        return __awaiter(this, void 0, Promise, function* () {
            let _dataFile = this._dataFile;
            return new Promise(function (resolve, reject) {
                fs.readFile(_dataFile, 'utf8', function (err, data) {
                    if (err)
                        reject(err);
                    resolve(JSON.parse(data));
                });
            });
        });
    }
};
FileAccountService = __decorate([
    kernel_1.provideNamed(types_1.default.FileAccountService, "not-throwable"), 
    __metadata('design:paramtypes', [])
], FileAccountService);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileAccountService;
//# sourceMappingURL=fileAccountService.js.map