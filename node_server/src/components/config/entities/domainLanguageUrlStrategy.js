/// <reference path="../interfaces.d.ts" />
/// <reference path="../../../../typings/main/ambient/node/index.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const kernel_1 = require("../config/kernel");
const types_1 = require("../constants/types");
const NodeURL = require('url');
let DomainLanguageUrlStrategy = class DomainLanguageUrlStrategy {
    setRequestUrl(requestUrl) {
        this._requestUrl = requestUrl;
        this._parsedUrl = NodeURL.parse(requestUrl);
    }
    getDomain() {
        return this._parsedUrl.host;
    }
    getCountry() {
        return "null";
    }
    getLanguage() {
        return this._parsedUrl.pathname.split("/").slice(-2, -1).toString();
    }
    getPagePath() {
        return this.getDomain() + "_" + this.getLanguage() + "-" + this.getCountry();
    }
};
DomainLanguageUrlStrategy = __decorate([
    kernel_1.provideNamed(types_1.default.DomainLanguageUrlStrategy, "not-throwable"), 
    __metadata('design:paramtypes', [])
], DomainLanguageUrlStrategy);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DomainLanguageUrlStrategy;
//# sourceMappingURL=domainLanguageUrlStrategy.js.map