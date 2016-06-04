/// <reference path="../interfaces.d.ts" />
/// <reference path="../../../../typings/main/ambient/node/index.d.ts" />

import {  inject, named } from "inversify";
import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

import NodeURL = require('url');

@provideNamed(TYPES.DomainLanguageUrlStrategy, "not-throwable")
class DomainLanguageUrlStrategy implements IUrlStrategy {

    private _requestUrl: string;
    private _parsedUrl: NodeURL.Url;

    public setRequestUrl(requestUrl: string) {
        this._requestUrl = requestUrl;
        this._parsedUrl = NodeURL.parse(requestUrl);
    }
    public getDomain(): string {
        return this._parsedUrl.host;
    }
    public getCountry(): string {
        return "null";
    }
    public getLanguage(): string {
        return this._parsedUrl.pathname.split("/").slice(-2, -1).toString();
    }
    public getPagePath(): string {
        return this.getDomain() + "_" + this.getLanguage() + "-" + this.getCountry();
    }

}



export default DomainLanguageUrlStrategy;
