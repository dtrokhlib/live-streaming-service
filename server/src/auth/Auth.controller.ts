import { inject } from 'inversify';
import { BaseController } from '../common/Base.controller';
import { BodyValidation } from '../middlewares/body-validation.middleware';
import { TYPES } from '../types';
import { UserDto } from '../user/dto/user-create.dto';
import { UserService } from '../user/User.service';
import Controller from '../utils/decorators/controller.decorator';
import { Get, Post } from '../utils/decorators/handlers.decorator';
import { Request, Response } from 'express';
import { AuthService } from './Auth.service';
import { GitHubAccessTokenUrl } from './Auth.constants';
import axios from 'axios';
import { gitHubUserProfile } from './interfaces/user-profile.interface';

@Controller('/auth')
export class AuthController extends BaseController {
    constructor(
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.AuthService) private authService: AuthService
    ) {
        super();
    }

    @Post('/login', [new BodyValidation(UserDto)])
    async login(req: Request, res: Response) {}

    @Post('/register', [new BodyValidation(UserDto)])
    async register(req: Request, res: Response) {
        const oldUser = await this.userService.findUserByParam({
            email: req.body.email,
        });
        if (oldUser) {
            return res.status(400).send('Email already in use');
        }

        const newUser = await this.userService.createUser(req.body);
        res.status(201).send(newUser);
    }

    @Post('/logout')
    async logout(req: Request, res: Response) {}

    @Get('/oauth-callback')
    async oauth(req: Request, res: Response) {
        const url = GitHubAccessTokenUrl + req.query.code;
        const token = String(await this.authService.accessTokenRequest(url));
        const userProfile = await this.authService.gitHubProfileRequest(token);

        res.send({
            userProfileLogin: userProfile.login,
            userProfileEmail: userProfile.email,
        });
    }
}
