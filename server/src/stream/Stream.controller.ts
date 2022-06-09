import { inject } from 'inversify';
import { BaseController } from '../common/Base.controller';
import { TYPES } from '../types';
import { UserService } from '../user/User.service';
import Controller from '../utils/decorators/controller.decorator';
import { Get, Post } from '../utils/decorators/handlers.decorator';
import { Request, Response } from 'express';

import { AuthRequiredMiddleware } from '../middlewares/auth-required.middleware';
import { AuthService } from '../auth/Auth.service';
import { User } from '../user/User.model';
import shortid from 'shortid';
import { userStreamKeyNotGeneratedError } from '../errors/errors.constants';

@Controller('/streams')
export class StreamController extends BaseController {
    constructor(
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.AuthService) private authService: AuthService
    ) {
        super();
    }

    @Get('/stream-key', [new AuthRequiredMiddleware()])
    async getStreamKey(req: Request, res: Response) {
        res.send({ stream_key: req.user?.streamKey });
    }

    @Post('/stream-key', [new AuthRequiredMiddleware()])
    async generateStreamKey(req: Request, res: Response) {
        const streamKey = shortid.generate();
        const user = await this.userService.updateUser(req.user?.id, { streamKey });

        if (user?.streamKey !== streamKey) {
            return res
                .status(500)
                .send({ message: userStreamKeyNotGeneratedError });
        }

        res.send({ streamKey });
    }

    @Get('/info', [new AuthRequiredMiddleware()])
    async streamsInfo(req: Request, res: Response) {
        if (!req.query.streams) {
            return res.send();
        }
        let streams = JSON.parse(req.query.streams as string);
        let stream_keys = [];
        for (let stream in streams) {
            if (!streams.hasOwnProperty(stream)) continue;
            stream_keys.push({ stream_key: stream });
        }

        const users = await User.find({ $or: stream_keys });
        if (!users) return res.send();

        res.send(users);
    }
}
