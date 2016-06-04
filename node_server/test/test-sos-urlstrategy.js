/// <reference path="../src/components/config/interfaces.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const kernel_1 = require("../src/components/config/config/kernel");
const types_1 = require("../src/components/config/constants/types");
require("../src/components/config/config/wiring");
let test = require('tape');
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let urlStrategy = kernel_1.kernel.get(types_1.default[this._urlStrategy]);
        urlStrategy.setRequestUrl("http://www.shop-online-shop.nl/nl/");
        test('base account path test', function (t) {
            t.plan(2);
            t.end();
        });
    });
}
main();
//# sourceMappingURL=test-sos-urlstrategy.js.map