/// <reference path="../interfaces.d.ts" />
"use strict";
require("../config/wiring");
class AppImpl {
    setConfigObject(config) {
        this._config = config;
    }
    setRequest(url) {
        this._url = url;
    }
    getPage() {
        return "";
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppImpl;
//# sourceMappingURL=appImpl.js.map