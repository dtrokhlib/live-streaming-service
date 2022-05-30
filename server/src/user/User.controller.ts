import Controller from '../utils/decorators/controller.decorator';
import { Delete, Get, Post, Put } from '../utils/decorators/handlers.decorator';
import { Request, Response } from 'express';

import 'reflect-metadata';
import { BaseController } from '../common/Base.controller';
import { inject } from 'inversify';
import { TYPES } from '../types';
import { UserService } from './User.service';

@Controller('/user')
export default class UserController extends BaseController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {
        super();
    }

    @Get('/')
    getUser(req: Request, res: Response) {
        res.send('Get User');
    }

    @Post('/')
    postUser(req: Request, res: Response) {
        res.send('Post User');
    }

    @Delete('/')
    deleteUser(req: Request, res: Response) {
        res.send('Delete User');
    }

    @Put('/')
    putUser(req: Request, res: Response) {
        res.send('Put User');
    }
}
