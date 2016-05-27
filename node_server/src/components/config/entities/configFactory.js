/// <reference path="../interfaces.d.ts" />
"use strict";
const kernel_1 = require("../config/kernel");
const types_1 = require("../constants/types");
require("../config/wiring");
class ConfigFactory {
    setConfigFile(configFile) {
        this._configFile = configFile;
    }
    getConfigObject() {
        //let config = kernel.get<IConfig>(TYPES.Config);
        let config = kernel_1.kernel.get(types_1.default["Config"]);
        config.setConfigFile(this._configFile);
        return config;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfigFactory;
//# sourceMappingURL=configFactory.js.map