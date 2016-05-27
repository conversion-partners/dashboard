/// <reference path="../interfaces.d.ts" />

import { kernel } from "../config/kernel";
import TYPES from "../constants/types";
import "../config/wiring";

class ConfigFactory implements IConfigFactory {

    private _configFile: string;
    private _confObj: IConfigObject;
    private _configService: string;
    public constructor(confFile: string) {
        this._confObj = require(confFile);
        if (this._confObj.configService.type == "file") {
            this._configService = "ConfigService";
        } else {
            throw "No config service defined please set : file";
        }
    }

    public setConfigFile(configFile: string): void {
        this._configFile = configFile;
    }

    public getConfigObject(): IConfig {
        let config = kernel.get<IConfig>(TYPES.Config);
        let configService = kernel.get<IConfigService>(TYPES[this._configService]);
        config.setConfigFile(this._configFile);
        config.setConfigService(configService);
        return config;
    }

}

export default ConfigFactory;