/// <reference path="../src/components/config/interfaces.d.ts" />

import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";

let test = require('tape');

import AppFactory from "../src/components/config/entities/appFactory";

async function main() {


    let urlStrategy = kernel.get<IUrlStrategy>(TYPES[this._urlStrategy]);

    urlStrategy.setRequestUrl("http://www.shop-online-shop.nl/nl/");


    test('base account path test', function (t) {
        t.plan(2);
        t.end();
    });

}



main();