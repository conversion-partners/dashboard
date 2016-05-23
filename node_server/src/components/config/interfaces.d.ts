/// <reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts" />
/// <reference path="../../../node_modules/inversify-dts/inversify-binding-decorators/inversify-binding-decorators.d.ts" />
/// <reference path="../../../node_modules/inversify-dts/inversify-logger-middleware/inversify-logger-middleware.d.ts" />

interface IConfig {
    getAccountPath(): string;
}

interface IConfigService {
    getAll(): Object;
}

interface IWarrior {
    fight(): string;
}

interface IWeapon {
    use(): string;
}