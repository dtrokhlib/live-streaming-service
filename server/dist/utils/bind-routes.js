"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindRoutes = void 0;
const express_1 = require("express");
const metadata_key_1 = require("./metadata.key");
require("reflect-metadata");
const bindRoutes = (controllerInstance, controllerClass) => {
    const basePath = Reflect.getMetadata(metadata_key_1.MetadataKeys.BASE_PATH, controllerClass);
    const routers = Reflect.getMetadata(metadata_key_1.MetadataKeys.ROUTERS, controllerClass);
    const router = (0, express_1.Router)();
    routers.forEach(({ method, path, middlewares, handlerName }) => {
        const middleware = middlewares === null || middlewares === void 0 ? void 0 : middlewares.map((m) => m.execute.bind(m));
        const handler = controllerInstance[String(handlerName)].bind(controllerInstance);
        const pipeline = middleware ? [...middleware, handler] : handler;
        router[method](path, pipeline);
    });
    return {
        basePath,
        router,
    };
};
exports.bindRoutes = bindRoutes;
