/// <reference path="../interfaces.d.ts" />

import {  inject, named } from "inversify";
import { provide } from "../config/kernel";

import TYPES from "../constants/types";

@provide(TYPES.Warrior)
class Warrior implements IWarrior {
    private _weapon: IWeapon;
    public constructor(
        @inject(TYPES.Weapon) @named("not-throwable") weapon: IWeapon
    ) {
        this._weapon = weapon;
    }
    public fight() {
        return this._weapon.use();
    }
}

export default Warrior;

