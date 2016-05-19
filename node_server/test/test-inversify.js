"use strict";
const kernel_1 = require("../src/inversify/config/kernel");
const types_1 = require("../src/inversify/constants/types");
require("../src/inversify/config/wiring");
let warrior = kernel_1.kernel.get(types_1.default.Warrior);
let msg = warrior.fight();
console.log(msg);
//# sourceMappingURL=test-inversify.js.map