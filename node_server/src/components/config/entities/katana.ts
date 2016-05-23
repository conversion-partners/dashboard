/// <reference path="../interfaces.d.ts" />

import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.Weapon, "not-throwable")
class Katana implements IWeapon {
    public use() {
        return "Using Katana...";
    }
}

export default Katana;
