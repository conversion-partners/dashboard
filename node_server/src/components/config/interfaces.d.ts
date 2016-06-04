/// <reference path="../../../node_modules/reflect-metadata/reflect-metadata.d.ts" />
/// <reference path="../../../node_modules/inversify-dts/inversify-binding-decorators/inversify-binding-decorators.d.ts" />
/// <reference path="../../../node_modules/inversify-dts/inversify-logger-middleware/inversify-logger-middleware.d.ts" />

interface IAppFactory {
    getConfigObject(): IConfig;
    getApp(): IApp;
}
interface IApp {
    setConfigObject(config: IConfig): void;
    setRequest(url: string): void;
}
interface IConfig {
    setConfigService(configService: IConfigService): void;
    setAccountService(accountService: IAccountService): void;
    setUrlStrategy(urlStrategy: IUrlStrategy): void;
    setConfigObject(configObject: IConfigObject): void;
    setRequestUrl(url: string): void;
    getBaseAccountPath(): Object;
    getConfigObj(): Promise<IConfigObject>;
    getAccountPath(): Object;
}
interface IConfigService {
    setConfigObject(configObject: IConfigObject): void;
    setUrlStrategy(urlStrategy: IUrlStrategy): void;
    setAccountService(accountService: IAccountService): void;
    getConfigObj(): Promise<IConfigObject>;
    getBaseAccountPath(): Object;
    setRequestUrl(url: string): void;
    getAccountPath(): Object;
}
interface IAccountService {
    setDomain(domain: string): void;
    setConfigObject(configObject: IAccountServiceJSON):void;
    getAccount(): Promise<IAccount>;
}
interface IAccountDB {
    
}
interface IAccount {
    domain: string;
    account: string;
}
interface IUrlStrategy {
    getDomain(): string;
    setRequestUrl(url: string): void;
}
interface IConfigObject {
    path: IPathObject;
    configService: IConfigServiceJSON;
    accountService: IAccountServiceJSON;
    urlStrategy: IUrlStrategyJSON;
}
interface IConfigServiceJSON {
    type: string;
    source: string;
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