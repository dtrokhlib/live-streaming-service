import express, { Express } from 'express';
import path from 'path';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';

export const RedisStore = connectRedis(session);
export const redisClient = createClient();

export class App {
    app: Express;

    constructor() {
        this.app = express();
    }

    set() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, './views'));
    }

    async use() {
        await redisClient.connect();

        this.app.use(
            session({
                store: new RedisStore({ client: redisClient }),
                secret: process.env.SESSION_SECRET!,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: false,
                    httpOnly: false,
                    maxAge: 1000 * 60 * 10,
                },
            })
        );
        this.app.use(cookieParser());
        this.app.use(express.static('public'));
        this.app.use(flash());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    buildAndGetApp() {
        this.set();
        this.use();
        return this.app;
    }
}
