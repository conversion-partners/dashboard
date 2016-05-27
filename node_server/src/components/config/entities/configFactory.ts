/// <reference path="../interfaces.d.ts" />

import { kernel } from "../config/kernel";
import TYPES from "../constants/types";
import "../config/wiring";

class ConfigFactory implements IConfigFactory {

    private _configFile: string;

    public setConfigFile(configFile: string): void {
        this._configFile = configFile;
    }

    public getConfigObject(): IConfig {
        let config = kernel.get<IConfig>(TYPES.Config);
        config.setConfigFile(this._configFile);
        return config;
    }

}

export default ConfigFactory;