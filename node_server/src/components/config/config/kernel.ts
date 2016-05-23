/// <reference path="../interfaces.d.ts" />

import "reflect-metadata";
import { Kernel } from "inversify";
import { makeProvideDecorator, makeFluentProvideDecorator } from "inversify-binding-decorators";
import makeLoggerMiddleware from "inversify-logger-middleware";

let kernel = new Kernel();
let logger = makeLoggerMiddleware();
kernel.applyMiddleware(logger);

let provide = makeProvideDecorator(kernel);
let fluentProvide = makeFluentProvideDecorator(kernel);

function provideNamed(serviceIdentifier: string, named: string) {
    return fluentProvide(serviceIdentifier).whenTargetNamed(named).done();
}

export { kernel, provide, fluentProvide, provideNamed };
