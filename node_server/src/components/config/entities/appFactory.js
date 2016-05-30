/// <reference path="../interfaces.d.ts" />
"use strict";
const kernel_1 = require("../config/kernel");
const types_1 = require("../constants/types");
require("../config/wiring");
class AppFactory {
    constructor(confFile) {
        this._confObj = require(confFile);
        if (this._confObj.configService.type == "file") {
            this._configService = types_1.default.ConfigService;
        }
        else {
            throw "No config service defined please set : file";
        }
        if (this._confObj.accountService.type == "file") {
            this._accountService = types_1.default.FileAccountService;
        }
        else {
            throw "No account service defined please set : file";
        }
        if (this._confObj.urlStrategy.type == "domain-language") {
            this._urlStrategy = types_1.default.UrlStrategy;
        }
        else {
            throw "No account service defined please set : file";
        }
    }
    setConfigFile(configFile) {
        this._configFile = configFile;
    }
    getConfigObject() {
        let config = kernel_1.kernel.get(types_1.default.Config);
        let configService = kernel_1.kernel.get(types_1.default[this._configService]);
        let accountService = kernel_1.kernel.get(types_1.default[this._accountService]);
        let urlStrategy = kernel_1.kernel.get(types_1.default[this._urlStrategy]);
        config.setConfigService(configService);
        config.setAccountService(accountService);
        config.setUrlStrategy(urlStrategy);
        config.setConfigFile(this._configFile);
        return config;
    }
    getApp() {
        return null;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppFactory;
//# sourceMappingURL=appFactory.js.map