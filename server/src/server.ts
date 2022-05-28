import 'dotenv/config';
import { Server } from 'http';
import { App } from './app';
import morgan from 'morgan';

morgan('tiny');


const bootstrap = async () => {
    const app = new App().buildAndGetApp();
    const server = new Server(app);

    server.listen(process.env.PORT, () => {
        console.log(`Server has started on port: ${process.env.PORT}`);
    });
};

bootstrap();
