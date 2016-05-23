/// <reference path="../interfaces.d.ts" />

import {  inject, named } from "inversify";
import { provide } from "../config/kernel";

import TYPES from "../constants/types";

@provide(TYPES.Warrior)
class Config implements IConfig {
    private _weapon: IWeapon;
    public constructor(
        @inject(TYPES.Weapon) @named("not-throwable") weapon: IWeapon
    ) {
        this._weapon = weapon;
    }
    public getAccountPath() {
        return this._weapon.use();
    }
    public fight() {
        return this._weapon.use();
    }
}

export default Config;

