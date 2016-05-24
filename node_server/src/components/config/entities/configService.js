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
let ConfigService = class ConfigService {
    setConfigFile(configFile) {
        return __awaiter(this, void 0, void 0, function* () {
            this._configFile = configFile;
            this._configObj = yield JSON.parse(this._configFile);
        });
    }
    getConfigObj() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._configObj;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
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
    getAccountPath() {
        return "accountpath";
    }
};
ConfigService = __decorate([
    kernel_1.provideNamed(types_1.default.ConfigService, "not-throwable"), 
    __metadata('design:paramtypes', [])
], ConfigService);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfigService;
//# sourceMappingURL=configService.js.map