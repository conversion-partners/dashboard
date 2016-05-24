/// <reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts" />
/// <reference path="../../../node_modules/inversify-dts/inversify-binding-decorators/inversify-binding-decorators.d.ts" />
/// <reference path="../../../node_modules/inversify-dts/inversify-logger-middleware/inversify-logger-middleware.d.ts" />

interface IConfig {
    getAccountPath(): Object;
    setConfigFile(configFile: string): void
    getConfigObj():Object;
}

interface IConfigService {
    setConfigFile(configFile: string): void
    getConfigObj();
    getAccountPath(): Object;
}

interface IConfigObject {
    path: IPathObject 
}

interface IPathObject {
    account: string
}

interface IWarrior {
    fight(): string;
}

interface IWeapon {
    use(): string;
}