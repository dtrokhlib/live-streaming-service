import Controller from '../utils/decorators/controller.decorator';
import { Delete, Get, Post, Put } from '../utils/decorators/handlers.decorator';
import { Request, Response } from 'express';

import 'reflect-metadata';
import { BaseController } from '../common/Base.controller';
import { inject } from 'inversify';
import { TYPES } from '../types';
import { UserService } from './User.service';
import { ObjectIdValidationMiddleware } from '../middlewares/object-id-validation.middleware';
import { BodyValidationMiddleware } from '../middlewares/body-validation.middleware';

@Controller('/user')
export default class UserController extends BaseController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {
        super();
    }

    @Get('/')
    async getUsers(req: Request, res: Response) {
        res.send(await this.userService.findUsers());
    }

    @Get('/:id', [new ObjectIdValidationMiddleware()])
    getSingleUser(req: Request, res: Response) {
        res.send('Get User');
    }

    // body validation create with class validation
    @Post('/', [
        new BodyValidationMiddleware(['email', 'username', 'password']),
    ])
    createUser(req: Request, res: Response) {
        res.send('Post User');
    }

    @Delete('/')
    deleteUser(req: Request, res: Response) {
        res.send('Delete User');
    }

    @Put('/')
    updateUser(req: Request, res: Response) {
        res.send('Put User');
    }
}
