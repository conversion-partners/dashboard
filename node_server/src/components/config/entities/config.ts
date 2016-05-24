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
    public setConfigFile(configFile) {
        this._service.setConfigFile(configFile);
    }
    public async getConfigObj(){
        return this._service.getAll();
    }
    public getAccountPath() {
        return "test";// this._service.getAccountPath();
    }
}

export default Config;

