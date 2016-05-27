/// <reference path="../interfaces.d.ts" />
"use strict";
const kernel_1 = require("../config/kernel");
const types_1 = require("../constants/types");
require("../config/wiring");
class ConfigFactory {
    constructor(confFile) {
        this._confObj = require(confFile);
        if (this._confObj.configService.type == "file") {
            this._configService = "ConfigService";
        }
        else {
            throw "No config service defined please set : file";
        }
    }
    setConfigFile(configFile) {
        this._configFile = configFile;
    }
    getConfigObject() {
        let config = kernel_1.kernel.get(types_1.default.Config);
        let configService = kernel_1.kernel.get(types_1.default[this._configService]);
        config.setConfigFile(this._configFile);
        return config;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfigFactory;
//# sourceMappingURL=configFactory.js.map