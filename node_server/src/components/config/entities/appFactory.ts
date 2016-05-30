/// <reference path="../interfaces.d.ts" />

import { kernel } from "../config/kernel";
import TYPES from "../constants/types";
import "../config/wiring";

class AppFactory implements IAppFactory {

    private _configFile: string;
    private _confObj: IConfigObject;
    private _configService: string;
    private _accountService: string;
    private _urlStrategy: string;

    public constructor(confFile: string) {
        this._confObj = require(confFile);
        if (this._confObj.configService.type == "file") {
            this._configService = TYPES.ConfigService;

        } else {
            throw "No config service defined please set : file";
        }
        if (this._confObj.accountService.type == "file") {
            this._accountService = TYPES.FileAccountService;

        } else {
            throw "No account service defined please set : file";
        }
        if (this._confObj.urlStrategy.type == "domain-language") {
            this._urlStrategy = TYPES.UrlStrategy;

        } else {
            throw "No account service defined please set : file";
        }

    }

    public setConfigFile(configFile: string): void {
        this._configFile = configFile;
    }

    public getConfigObject(): IConfig {
        let config = kernel.get<IConfig>(TYPES.Config);
        let configService = kernel.get<IConfigService>(TYPES[this._configService]);
        let accountService = kernel.get<IAccountService>(TYPES[this._accountService]);
        let urlStrategy = kernel.get<IUrlStrategy>(TYPES[this._urlStrategy]);


        config.setConfigService(configService);
        config.setAccountService(accountService);
        config.setUrlStrategy(urlStrategy);
        config.setConfigFile(this._configFile);

        return config;
    }
    public getApp(): IApp {
        return null;
    }
}

export default AppFactory;