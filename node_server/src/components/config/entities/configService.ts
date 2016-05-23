/// <reference path="../interfaces.d.ts" />

import { provideNamed } from "../config/kernel";
import TYPES from "../constants/types";

@provideNamed(TYPES.ConfigService, "not-throwable")
class ConfigService  implements IConfigService {


    getAll() {
         return new Promise(resolve => function(){
             
         });
    }
}



export default ConfigService;
