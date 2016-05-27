/// <reference path="../interfaces.d.ts" />

import { kernel } from "../config/kernel";
import TYPES from "../constants/types";
import "../config/wiring";

class ConfigFactory implements IConfigFactory {

    private _configFile: string;
    private _confObj: IConfigObject;

    public constructor(confFile: string) {
        this._confObj = require(confFile);
    }

    public setConfigFile(configFile: string): void {
        this._configFile = configFile;
    }

    public getConfigObject(): IConfig {
        //let config = kernel.get<IConfig>(TYPES.Config);
        let config = kernel.get<IConfig>(TYPES["Config"]);
        // todo..
        //let configService = kernel.get<IConfigService>(TYPES[this._confObj.configService.type]);
        config.setConfigFile(this._configFile);
        return config;
    }

}

export default ConfigFactory;