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
import { emailAlreadyInUseError, userNotFoundError } from '../errors/errors.constants';

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
            return res.status(400).send(emailAlreadyInUseError);
        }

        const newUser = await this.userService.createUser(req.body);
        res.status(201).send(newUser);
    }

    @Get('/:id', [new ObjectIdValidation()])
    async getSingleUser(req: Request, res: Response) {
        res.send(await this.userService.findUserById(req.params.id));
    }

    @Delete('/:id', [new ObjectIdValidation()])
    async deleteUser(req: Request, res: Response) {
        const deletedUser = await this.userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).send(userNotFoundError);
        }

        res.status(204).send();
    }

    @Put('/:id', [new ObjectIdValidation()])
    async updateUser(req: Request, res: Response) {
        const user = await this.userService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).send(userNotFoundError);
        }

        res.send(user);
    }
}
