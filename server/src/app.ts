import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import UserController from './user/User.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { bindRoutes } from './utils/bind-routes';
import { AuthController } from './auth/Auth.controller';
import cors from 'cors';
import { IsAuthorizedMiddleware } from './middlewares/is-authorized.middleware';
import { StreamController } from './stream/Stream.controller';

@injectable()
export class App {
    private readonly _instance: Application;

    get instance(): Application {
        return this._instance;
    }

    constructor(
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.AuthController) private authController: AuthController,
        @inject(TYPES.StreamController)
        private streamController: StreamController
    ) {
        this._instance = express();
    }

    private appSet() {}

    private useRoutes() {
        const userRouter = bindRoutes(this.userController, UserController);
        const authRouter = bindRoutes(this.authController, AuthController);
        const streamRouter = bindRoutes(
            this.streamController,
            StreamController
        );

        this._instance.use(new IsAuthorizedMiddleware().execute);
        this._instance.use(userRouter.basePath, userRouter.router);
        this._instance.use(authRouter.basePath, authRouter.router);
        this._instance.use(streamRouter.basePath, streamRouter.router);

        this._instance.use(
            '/thumbnails',
            express.static(path.join(__dirname, '/../thumbnails'))
        );

        this._instance.use(express.static(path.join(__dirname, '/../public')));
        this._instance.use('/', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '/../public/index.html'));
        });
    }

    private async appUse() {
        this._instance.use(cors());
        this._instance.use(express.json());
        this._instance.use(express.urlencoded({ extended: true }));
    }

    public async init() {
        await this.appSet();
        await this.appUse();
        await this.useRoutes();
    }
}
