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

import { kernel } from "./config/kernel";
import TYPES from "./constants/types";
import "./config/wiring";

let warrior = kernel.get<IWarrior>(TYPES.Warrior);
let msg = warrior.fight();
console.log(msg);