/// <reference path="../interfaces.d.ts" />
/// <reference path="../../../../typings/main/ambient/node/index.d.ts" />

import {  inject, named } from "inversify";
import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

var url = require("url");

@provideNamed(TYPES.UrlStrategy, "not-throwable")
class UrlStrategy implements IUrlStrategy {

    private _requestUrl: string;
    private _parsedUrl: URL;

    public getAccount() : string {
        return this._parsedUrl['path'];
    }
    
    public setRequestUrl(requestUrl: string){
        this._requestUrl = requestUrl;
        this._parsedUrl = url.parse(requestUrl);
    }

    
}



export default UrlStrategy;
