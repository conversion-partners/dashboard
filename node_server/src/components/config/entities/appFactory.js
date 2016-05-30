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
        if (this._confObj.configService.type == "file") {
            this._configService = types_1.default.ConfigService;
        }
        else {
            throw "No config service defined please set : file";
        }
        /*
                "type" : "file",
        "source" : "/path.dsafasd.sda.fads.f//////"
    },
    "configService" : {
        "type" : "file",
        "source" : "/pathefdsafsadfsd"
    },
    "urlStrategy" : {
        "type" : "domain-language"
        */
    }
    setConfigFile(configFile) {
        this._configFile = configFile;
    }
    getConfigObject() {
        let config = kernel_1.kernel.get(types_1.default.Config);
        let configService = kernel_1.kernel.get(types_1.default[this._configService]);
        let accountService = kernel_1.kernel.get(types_1.default[this._accountService]);
        //        let urlStrategy = kernel.get<IUrlStrategy>(TYPES[this._urlStrategy]);
        config.setConfigFile(this._configFile);
        config.setConfigService(configService);
        config.setAccountService(accountService);
        //      config.setUrlStrategy(urlStrategy);
        return config;
    }
    getApp() {
        return null;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppFactory;
//# sourceMappingURL=appFactory.js.map