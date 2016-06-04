/// <reference path="../interfaces.d.ts" />

import { kernel } from "../config/kernel";
import TYPES from "../constants/types";
import "../config/wiring";

class AppImpl implements IApp {

    private _config: IConfig;
    private _url: string;

    public setConfigObject(config: IConfig): void {
        this._config = config;
    }
    public setRequest(url: string): void {
        this._url = url;
    }
    public getPage(): string {
        return "";
    }
}

export default AppImpl;