import 'dotenv/config';
import { Server } from 'http';
import { App } from './app';
import { TYPES } from './types';
import UserController from './user/User.controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { UserService } from './user/User.service';
import { connect } from 'mongoose';
import { AuthController } from './auth/Auth.controller';
import { AuthService } from './auth/Auth.service';
import { StreamController } from './stream/Stream.controller';
import { cronThumbnailGenerateJob } from './utils/cron-thumbnail-generate';
import { nodeMediaServer } from './RTMP-server';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<UserService>(TYPES.UserService).to(UserService);
    bind<AuthController>(TYPES.AuthController).to(AuthController);
    bind<AuthService>(TYPES.AuthService).to(AuthService);
    bind<StreamController>(TYPES.StreamController).to(StreamController);
    bind<App>(TYPES.Application).to(App).inSingletonScope();
});

const bootstrap = async () => {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);

    await connect(process.env.MONGODB_URL!);
    await app.init();
    await nodeMediaServer.run();
    cronThumbnailGenerateJob.start();
    const server = new Server(app.instance);
    server.listen(process.env.PORT, () => {
        console.log(`Server has started on port: ${process.env.PORT}`);
    });
};

bootstrap();

