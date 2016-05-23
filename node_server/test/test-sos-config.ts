import { kernel } from "../src/components/config/config/kernel";
import TYPES from "../src/components/config/constants/types";
import "../src/components/config/config/wiring";

let config = kernel.get<IConfig>(TYPES.Config);
let accountPath = config.getAccountPath();
console.log(accountPath);
