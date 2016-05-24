/// <reference path="../interfaces.d.ts" />

import {  inject, named } from "inversify";
import { provide } from "../config/kernel";

import TYPES from "../constants/types";

@provide(TYPES.Config)
class Config implements IConfig {
    private _service: IConfigService;
    public constructor(
        @inject(TYPES.ConfigService) @named("not-throwable") configService: IConfigService
    ) {
        this._service = configService;
    }
    public setConfigFile(configFile: string) {
        this._service.setConfigFile(configFile);
    }
    public setRequestUrl(url: string) {
        this._service.setRequestUrl(url);
    }
    public async getConfigObj() {
        return await this._service.getConfigObj();
    }
    public async getBaseAccountPath() {
        return await this._service.getBaseAccountPath();
    }
    public async getAccountPath() {
        return await this._service.getAccountPath();
    }
}

export default Config;

