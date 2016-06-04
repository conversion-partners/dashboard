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

    public getDomain() : string {
        return this._parsedUrl.host;
    }
    
    public setRequestUrl(requestUrl: string){
        this._requestUrl = requestUrl;
        this._parsedUrl = NodeURL.parse(requestUrl);
    }

    
}



export default DomainLanguageUrlStrategy;
