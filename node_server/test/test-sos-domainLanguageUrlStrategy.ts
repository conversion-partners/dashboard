/// <reference path="../src/components/config/interfaces.d.ts" />

import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";

let test = require('tape');


async function main() {


    let urlStrategy = kernel.get<IUrlStrategy>(TYPES.DomainLanguageUrlStrategy);
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

}



main();