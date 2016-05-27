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
const inversify_1 = require("inversify");
const kernel_1 = require("../config/kernel");
const types_1 = require("../constants/types");
let Config = class Config {
    constructor(configService, accountService, urlStrategy) {
        this._configService = configService;
        this._accountService = accountService;
        this._configService.setUrlStrategy(urlStrategy);
    }
    setConfigFile(configFile) {
        this._configService.setConfigFile(configFile);
    }
    setRequestUrl(url) {
        this._configService.setRequestUrl(url);
    }
    getConfigObj() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._configService.getConfigObj();
        });
    }
    getBaseAccountPath() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._configService.getBaseAccountPath();
        });
    }
    getAccountPath() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._configService.getAccountPath();
        });
    }
};
Config = __decorate([
    kernel_1.provide(types_1.default.Config),
    __param(0, inversify_1.inject(types_1.default.ConfigService)),
    __param(0, inversify_1.named("not-throwable")),
    __param(1, inversify_1.inject(types_1.default.AccountService)),
    __param(1, inversify_1.named("not-throwable")),
    __param(2, inversify_1.inject(types_1.default.UrlStrategy)),
    __param(2, inversify_1.named("not-throwable")), 
    __metadata('design:paramtypes', [Object, Object, Object])
], Config);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Config;
//# sourceMappingURL=config.js.map