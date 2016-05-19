/// <reference path="../interfaces.d.ts" />
"use strict";
require("reflect-metadata");
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_logger_middleware_1 = require("inversify-logger-middleware");
let kernel = new inversify_1.Kernel();
exports.kernel = kernel;
let logger = inversify_logger_middleware_1.default();
kernel.applyMiddleware(logger);
let provide = inversify_binding_decorators_1.makeProvideDecorator(kernel);
exports.provide = provide;
let fluentProvide = inversify_binding_decorators_1.makeFluentProvideDecorator(kernel);
exports.fluentProvide = fluentProvide;
function provideNamed(serviceIdentifier, named) {
    return fluentProvide(serviceIdentifier).whenTargetNamed(named).done();
}
exports.provideNamed = provideNamed;
//# sourceMappingURL=kernel.js.map