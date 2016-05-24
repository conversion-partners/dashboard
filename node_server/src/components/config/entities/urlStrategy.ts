/// <reference path="../interfaces.d.ts" />

import {  inject, named } from "inversify";
import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.UrlStrategy, "not-throwable")
class UrlStrategy implements IUrlStrategy {


    
}



export default UrlStrategy;
