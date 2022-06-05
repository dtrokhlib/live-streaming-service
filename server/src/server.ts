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
import { RTMPServerService } from './rtmp-server/rtmp-server.service';
import { RTMPServerConfig } from '../../config/RTMP-server.config';
import NodeMediaServer from 'node-media-server';
import { User } from './user/User.model';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<UserService>(TYPES.UserService).to(UserService);
    bind<AuthController>(TYPES.AuthController).to(AuthController);
    bind<AuthService>(TYPES.AuthService).to(AuthService);
    bind<App>(TYPES.Application).to(App).inSingletonScope();
});

const bootstrap = async () => {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);

    await connect(process.env.MONGODB_URL!);
    await app.init();
    await nodeMediaServer.run();
    const server = new Server(app.instance);
    server.listen(process.env.PORT, () => {
        console.log(`Server has started on port: ${process.env.PORT}`);
    });
};

bootstrap();

export const RTMPConfig: any = RTMPServerConfig;
const nodeMediaServer = new NodeMediaServer(RTMPConfig);

nodeMediaServer.on(
    'prePublish',
    async (id: any, StreamPath: any, args: any) => {
        let streamKey = getStreamKeyFromStreamPath(StreamPath);

        const user = await User.findOne({ streamKey });

        if (!user) {
            let session: any = nodeMediaServer.getSession(id);
            session.reject();
        }

        console.log(
            '[NodeEvent on prePublish]',
            `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
        );
    }
);

const getStreamKeyFromStreamPath = (path: string) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
