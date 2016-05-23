import { kernel } from "../src/components/inversify/config/kernel";
import TYPES from "../src/components/inversify/constants/types";
import "../src/components/inversify/config/wiring";

let warrior = kernel.get<IWarrior>(TYPES.Warrior);
let msg = warrior.fight();
console.log(msg);
