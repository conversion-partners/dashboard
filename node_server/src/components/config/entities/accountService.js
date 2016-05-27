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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const inversify_1 = require("inversify");
const kernel_1 = require("../config/kernel");
const types_1 = require("../constants/types");
let AccountService = class AccountService {
    constructor(urlStrategy) {
        this._urlStrategy = urlStrategy;
    }
    setConfigFile(configFile) {
        return __awaiter(this, void 0, void 0, function* () {
            this._configFile = configFile;
        });
    }
    setRequestUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            this._urlStrategy.setRequestUrl(url);
        });
    }
    getConfigObj() {
        return __awaiter(this, void 0, Promise, function* () {
            let _configFile = this._configFile;
            return new Promise(function (resolve, reject) {
                fs.readFile(_configFile, 'utf8', function (err, data) {
                    if (err)
                        reject(err);
                    resolve(JSON.parse(data));
                });
            });
        });
    }
    getBaseAccountPath() {
        return __awaiter(this, void 0, void 0, function* () {
            let configObj = yield this.getConfigObj();
            return new Promise(function (resolve, reject) {
                resolve(configObj.path.account);
            });
        });
    }
    getAccountPath() {
        return __awaiter(this, void 0, void 0, function* () {
            let configObj = yield this.getConfigObj();
            let urlStrategy = this._urlStrategy;
            return new Promise(function (resolve, reject) {
                resolve(configObj.path.account + "/" + urlStrategy.getAccount());
            });
        });
    }
};
AccountService = __decorate([
    kernel_1.provideNamed(types_1.default.AccountService, "not-throwable"),
    __param(0, inversify_1.inject(types_1.default.UrlStrategy)),
    __param(0, inversify_1.named("not-throwable")), 
    __metadata('design:paramtypes', [Object])
], AccountService);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccountService;
//# sourceMappingURL=accountService.js.map