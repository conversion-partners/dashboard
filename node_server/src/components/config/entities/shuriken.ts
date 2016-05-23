/// <reference path="../interfaces.d.ts" />

import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.Weapon, "throwable")
class Shuriken implements IWeapon {
    public use() {
        return "Using Shuriken...";
    }
}

export default Shuriken;
