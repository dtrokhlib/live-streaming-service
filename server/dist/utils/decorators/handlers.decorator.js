"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = exports.Delete = exports.Post = exports.Get = exports.Methods = void 0;
const metadata_key_1 = require("../metadata.key");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["DELETE"] = "delete";
    Methods["PUT"] = "put";
})(Methods = exports.Methods || (exports.Methods = {}));
const methodDecoratorFactory = (method) => {
    return (path, middlewares) => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const routers = Reflect.hasMetadata(metadata_key_1.MetadataKeys.ROUTERS, controllerClass)
                ? Reflect.getMetadata(metadata_key_1.MetadataKeys.ROUTERS, controllerClass)
                : [];
            routers.push({
                method,
                path,
                middlewares,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(metadata_key_1.MetadataKeys.ROUTERS, routers, controllerClass);
        };
    };
};
exports.Get = methodDecoratorFactory(Methods.GET);
exports.Post = methodDecoratorFactory(Methods.POST);
exports.Delete = methodDecoratorFactory(Methods.DELETE);
exports.Put = methodDecoratorFactory(Methods.PUT);
