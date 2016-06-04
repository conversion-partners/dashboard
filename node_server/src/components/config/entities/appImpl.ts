/// <reference path="../interfaces.d.ts" />

import { kernel } from "../config/kernel";
import TYPES from "../constants/types";
import "../config/wiring";

class AppImpl implements IApp {

    private _config: IConfig;

    public setConfigObject(config: IConfig): void{
        this._config = config;
    }


}

export default AppImpl;