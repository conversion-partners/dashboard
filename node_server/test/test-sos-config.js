"use strict";
const kernel_1 = require("../src/components/config/config/kernel");
const types_1 = require("../src/components/config/constants/types");
require("../src/components/config/config/wiring");
let warrior = kernel_1.kernel.get(types_1.default.Warrior);
let msg = warrior.fight();
console.log(msg);
//# sourceMappingURL=test-sos-config.js.map