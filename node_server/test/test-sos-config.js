"use strict";
const kernel_1 = require("../src/components/config/config/kernel");
const types_1 = require("../src/components/config/constants/types");
require("../src/components/config/config/wiring");
let config = kernel_1.kernel.get(types_1.default.Config);
let accountPath = config.getAccountPath();
console.log(accountPath);
//# sourceMappingURL=test-sos-config.js.map