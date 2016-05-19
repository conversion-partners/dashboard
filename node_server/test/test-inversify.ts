import { kernel } from "../src/inversify/config/kernel";
import TYPES from "../src/inversify/constants/types";
import "../src/inversify/config/wiring";

let warrior = kernel.get<IWarrior>(TYPES.Warrior);
let msg = warrior.fight();
console.log(msg);