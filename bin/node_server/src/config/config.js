//var lib = require('./lib');
"use strict";
var Configure = (function () {
    function Configure(type) {
        this.type = type;
    }
    Configure.prototype.getType = function () {
        return "Hello, ";
    };
    return Configure;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Configure;
//# sourceMappingURL=config.js.map