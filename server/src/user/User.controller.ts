import Controller from '../utils/decorators/controller.decorator';
import { Delete, Get, Post, Put } from '../utils/decorators/handlers.decorator';
import { Request, Response } from 'express';

import 'reflect-metadata';
import { BaseController } from '../common/Base.controller';
import { inject } from 'inversify';
import { TYPES } from '../types';
import { UserService } from './User.service';
import { ObjectIdValidation } from '../middlewares/object-id-validation.middleware';
import { BodyValidation } from '../middlewares/body-validation.middleware';
import { UserDto } from './dto/user-create.dto';

@Controller('/user')
export default class UserController extends BaseController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {
        super();
    }

    @Get('/')
    async getUsers(req: Request, res: Response) {
        res.send(await this.userService.findUsers());
    }

    @Post('/', [new BodyValidation(UserDto)])
    async createUser(req: Request, res: Response) {
        const oldUser = await this.userService.findUserByParam({
            email: req.body.email,
        });
        if (oldUser) {
           return res.status(400).send('Email already in use');
        }

        const newUser = await this.userService.createUser(req.body);
        res.status(201).send(newUser);
    }

    @Get('/:id', [new ObjectIdValidation()])
    async getSingleUser(req: Request, res: Response) {
        res.send(await this.userService.findUserById(req.params.id));
    }

    @Delete('/:id', [new ObjectIdValidation()])
    deleteUser(req: Request, res: Response) {
        res.send('Delete User');
    }

    @Put('/:id', [new ObjectIdValidation()])
    updateUser(req: Request, res: Response) {
        res.send('Put User');
    }
}
