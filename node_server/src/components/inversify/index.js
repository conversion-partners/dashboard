/*
async function main() {
 await ping();
}

async function ping() {
 for (var i = 0; i < 10; i++) {
  await delay(300);
  console.log("ping");
 }
}

function delay(ms: number) {
 return new Promise(resolve => setTimeout(resolve, ms));
}

main();

*/
"use strict";
const kernel_1 = require("./config/kernel");
const types_1 = require("./constants/types");
require("./config/wiring");
let warrior = kernel_1.kernel.get(types_1.default.Warrior);
let msg = warrior.fight();
console.log(msg);
//# sourceMappingURL=index.js.map