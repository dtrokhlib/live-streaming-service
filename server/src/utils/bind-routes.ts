import { Handler, Router } from 'express';
import { BaseController } from '../common/Base.controller';
import { MetadataKeys } from './metadata.key';
import { IRouter } from './decorators/handlers.decorator';
import 'reflect-metadata';

export const bindRoutes = (
    controllerInstance: any,
    controllerClass: BaseController
) => {
    const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass
    );
    const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
    );

    const router = Router();

    routers.forEach(({ method, path, middlewares, handlerName }) => {
        const middleware = middlewares?.map((m) => m.execute.bind(m));
        const handler =
            controllerInstance[String(handlerName)].bind(controllerInstance);
        const pipeline = middleware ? [...middleware, handler] : handler;
        router[method](path, pipeline);
    });

    return {
        basePath,
        router,
    };
};
