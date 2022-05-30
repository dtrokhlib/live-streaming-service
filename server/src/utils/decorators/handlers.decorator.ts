import { IMiddleware } from '../interfaces/middleware.interface';
import { MetadataKeys } from '../metadata.key';

export enum Methods {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put',
}

export interface IRouter {
    method: Methods;
    path: string;
    handlerName: string | symbol;
    middlewares?: IMiddleware[];
}

const methodDecoratorFactory = (method: Methods) => {
    return (path: string, middlewares?: IMiddleware[]): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const routers: IRouter[] = Reflect.hasMetadata(
                MetadataKeys.ROUTERS,
                controllerClass
            )
                ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
                : [];

            routers.push({
                method,
                path,
                middlewares,
                handlerName: propertyKey,
            });

            Reflect.defineMetadata(
                MetadataKeys.ROUTERS,
                routers,
                controllerClass
            );
        };
    };
};

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Delete = methodDecoratorFactory(Methods.DELETE);
export const Put = methodDecoratorFactory(Methods.PUT);
