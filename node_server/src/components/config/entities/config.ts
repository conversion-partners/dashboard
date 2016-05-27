/// <reference path="../interfaces.d.ts" />

import {  inject, named } from "inversify";
import { provide } from "../config/kernel";

import TYPES from "../constants/types";

@provide(TYPES.Config)
class Config implements IConfig {
    private _configService: IConfigService;
    private _accountService: IAccountService;
    private _kernel: inversify.IKernel;

    public constructor(
        @inject(TYPES.ConfigService) @named("not-throwable") configService: IConfigService,
        @inject(TYPES.AccountService) @named("not-throwable") accountService: IAccountService,
        @inject(TYPES.UrlStrategy) @named("not-throwable") urlStrategy: IUrlStrategy
    ) {
        this._configService = configService;
        this._accountService = accountService;
        this._configService.setUrlStrategy(urlStrategy);
    }
    
    public setConfigService(configService: IConfigService): void{
        this._configService = configService;
    }
    
    public setConfigFile(configFile: string) {
        this._configService.setConfigFile(configFile);
    }
    public setRequestUrl(url: string) {
        this._configService.setRequestUrl(url);
    }
    public async getConfigObj() {
        return await this._configService.getConfigObj();
    }
    public async getBaseAccountPath() {
        return await this._configService.getBaseAccountPath();
    }
    public async getAccountPath() {
        return await this._configService.getAccountPath();
    }
}

export default Config;

