import { kernel } from "./config/kernel";
import TYPES from "./constants/types";
import "./config/wiring";

let warrior = kernel.get<IWarrior>(TYPES.Warrior);
let msg = warrior.fight();
console.log(msg);
