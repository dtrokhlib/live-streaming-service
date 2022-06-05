import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';

import 'reflect-metadata';
import UserController from './user/User.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { bindRoutes } from './utils/bind-routes';
import bodyParser from 'body-parser';
import { AuthController } from './auth/Auth.controller';
import cors from 'cors';

const RedisStore = connectRedis(session);
const redisClient = createClient({
    url: 'redis://127.0.0.1:6379',
});

redisClient.on('error', function (err) {
    console.log('Redis Error :' + err);
});

@injectable()
export class App {
    private readonly _instance: Application;

    get instance(): Application {
        return this._instance;
    }

    constructor(
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.AuthController) private authController: AuthController
    ) {
        this._instance = express();
    }

    private appSet() {
        this._instance.set('view engine', 'ejs');
        this._instance.set('views', path.join(__dirname, './views'));
    }

    private useRoutes() {
        const userRouter = bindRoutes(this.userController, UserController);
        const authRouter = bindRoutes(this.authController, AuthController);

        this._instance.use(userRouter.basePath, userRouter.router);
        this._instance.use(authRouter.basePath, authRouter.router);
    }

    private async appUse() {
        await redisClient.connect();

        this._instance.use(
            cors({
                credentials: true,
                origin: process.env.CLIENT_ORIGIN_URL!,
            })
        );
        this._instance.use(cookieParser());
        this._instance.use(express.static('public'));
        this._instance.use(flash());
        this._instance.use(bodyParser.json());
        this._instance.use(bodyParser.urlencoded({ extended: true }));
        this._instance.use(
            session({
                secret: process.env.SESSION_SECRET!,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: false,
                    httpOnly: true,
                    maxAge: 600000,
                },
            })
        );
    }

    public async init() {
        await this.appSet();
        await this.appUse();
        await this.useRoutes();
    }
}
