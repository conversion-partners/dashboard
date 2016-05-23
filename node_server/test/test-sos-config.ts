import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";

let warrior = kernel.get<IWarrior>(TYPES.Warrior);
let msg = warrior.fight();
console.log(msg);
