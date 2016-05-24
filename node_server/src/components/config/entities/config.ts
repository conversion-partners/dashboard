/// <reference path="../interfaces.d.ts" />

import {  inject, named } from "inversify";
import { provide } from "../config/kernel";

import TYPES from "../constants/types";

@provide(TYPES.Config)
class Config implements IConfig {
    private _service: IConfigService;
    private _configObj: Object;
    public constructor(
        @inject(TYPES.ConfigService) @named("not-throwable") configService: IConfigService
    ) {
        this._service = configService;
    }
    public setConfigFile(configFile) {
        this._service.setConfigFile(configFile);
        this._configObj = this._service.getAll();
    }
    public async getConfigObj() {
        return await this._configObj;
    }
    public async getAccountPath() {
        let obj = await this.getConfigObj();
        return obj['path']['account'];
    }
}

export default Config;

