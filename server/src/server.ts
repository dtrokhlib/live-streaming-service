import 'dotenv/config';
import { Server } from 'http';
import { App } from './app';
import { TYPES } from './types';
import UserController from './user/User.controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { UserService } from './user/User.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<UserService>(TYPES.UserService).to(UserService);
    bind<App>(TYPES.Application).to(App).inSingletonScope();
});

const bootstrap = async () => {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    const server = new Server(app.instance);

    server.listen(process.env.PORT, () => {
        console.log(`Server has started on port: ${process.env.PORT}`);
    });
};

bootstrap();
