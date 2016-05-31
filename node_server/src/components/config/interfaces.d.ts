/// <reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts" />
/// <reference path="../../../node_modules/inversify-dts/inversify-binding-decorators/inversify-binding-decorators.d.ts" />
/// <reference path="../../../node_modules/inversify-dts/inversify-logger-middleware/inversify-logger-middleware.d.ts" />

interface IAppFactory {
    setConfigFile(configFile: string): void;
    getConfigObject(): IConfig;
    getApp(): IApp;
}
interface IApp {
}
interface IConfig {
    setConfigService(configService: IConfigService): void;
    setAccountService(accountService: IAccountService): void;
    setUrlStrategy(urlStrategy: IUrlStrategy): void;
    getBaseAccountPath(): Object;
    setConfigFile(configFile: string): void;
    getConfigObj(): Promise<IConfigObject>;
    setRequestUrl(url: string): void;
    getAccountPath(): Object;
}
interface IConfigService {
    setConfigFile(configFile: string): void;
    setUrlStrategy(urlStrategy: IUrlStrategy): void;
    getConfigObj(): Promise<IConfigObject>;
    getBaseAccountPath(): Object;
    setRequestUrl(url: string): void;
    getAccountPath(): Object;
}
interface IAccountService {
    setDomain(domain: string): void;
    setConfigObject(configObject: IAccountServiceJSON):void;
    //getAccountDb(): Promise<IAccount>;
    getAccount(): Promise<IAccount>;
}
interface IAccountDB {
    
}
interface IAccount {
    domain: string;
    account: string;
}
interface IUrlStrategy {
    getAccount(): string;
    setRequestUrl(url: string): void;
}
interface IConfigObject {
    path: IPathObject;
    configService: IConfigServiceJSON;
    accountService: IAccountServiceJSON;
    urlStrategy: IUrlStrategyJSON;
}
interface IConfigServiceJSON {
    type: string
}
interface IAccountServiceJSON {
    type: string;
    dataFile : string;
}
interface IUrlStrategyJSON {
    type: string
}
interface IPathObject {
    account: string;
}
interface IWarrior {
    fight(): string;
}
interface IWeapon {
    use(): string;
}