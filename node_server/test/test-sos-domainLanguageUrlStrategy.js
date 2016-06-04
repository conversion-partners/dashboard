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
        let urlStrategy = kernel_1.kernel.get(types_1.default.DomainLanguageUrlStrategy);
        urlStrategy.setRequestUrl("http://sos.nl/nl/");
        let country = urlStrategy.getCountry();
        let language = urlStrategy.getLanguage();
        let pagePath = urlStrategy.getPagePath();
        test('base account path test', function (t) {
            t.plan(3);
            t.equal(country, "null");
            t.equal(language, "nl");
            t.equal(pagePath, "sos.nl_nl-null");
            t.end();
        });
    });
}
main();
//# sourceMappingURL=test-sos-domainLanguageUrlStrategy.js.map