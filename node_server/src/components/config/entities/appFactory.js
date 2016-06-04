/// <reference path="../interfaces.d.ts" />
"use strict";
const kernel_1 = require("../config/kernel");
const types_1 = require("../constants/types");
require("../config/wiring");
class AppFactory {
    constructor(confFile) {
        //yup cleanup
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
    getConfigObject() {
        let config = kernel_1.kernel.get(types_1.default.Config);
        let configService = kernel_1.kernel.get(types_1.default[this._configService]);
        let accountService = kernel_1.kernel.get(types_1.default[this._accountService]);
        accountService.setConfigObject(this._confObj.accountService);
        let urlStrategy = kernel_1.kernel.get(types_1.default[this._urlStrategy]);
        config.setConfigService(configService);
        config.setAccountService(accountService);
        config.setUrlStrategy(urlStrategy);
        config.setConfigObject(this._confObj);
        this._config = config;
        return config;
    }
    getApp() {
        let app = kernel_1.kernel.get(types_1.default.App);
        app.setConfigObject(this._config);
        return app;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppFactory;
//# sourceMappingURL=appFactory.js.map