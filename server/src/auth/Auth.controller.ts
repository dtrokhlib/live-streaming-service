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
import { authorizationPath } from './Auth.constants';
import { UserLoginDto } from '../user/dto/user-login.dto';

@Controller('/auth')
export class AuthController extends BaseController {
    constructor(
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.AuthService) private authService: AuthService
    ) {
        super();
    }

    @Post('/login', [new BodyValidation(UserLoginDto)])
    async login(req: Request, res: Response) {
        const user = await this.userService.findUserByParam({
            email: req.body.email,
        });
        if (!user) {
            return res.status(400).send('Provided credentials are not valid');
        }
        const validPass = await user.verifyPassword(req.body.password);
        if (!validPass) {
            return res.status(400).send('Provided credentials are not valid');
        }

        req.session.user = user;
        res.send(user);
    }

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
    async logout(req: Request, res: Response) {
        req.session.destroy((err) => {
            console.log(err);
        });

        res.redirect('/');
    }

    @Get('/github')
    async authGithubFlow(req: Request, res: Response) {
        res.redirect(`${authorizationPath}?client_id=${process.env.CLIENT_ID}`);
    }

    @Get('/oauth-github')
    async oauthGithub(req: Request, res: Response) {
        if (!req.query.code) {
            return res.status(500).send('GitHub User Code was not provided');
        }
        const token = await this.authService.accessTokenRequest(
            String(req.query.code)
        );
        const userProfile = await this.authService.gitHubProfileRequest(token);
        res.send(userProfile);
    }
}
