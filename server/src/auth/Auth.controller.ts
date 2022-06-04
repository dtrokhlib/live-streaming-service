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
import {
    emailAlreadyInUseError,
    gitHubUserCodeError,
    invalidCredentialsError,
    notAuthenticatedError,
} from '../errors/errors.constants';

@Controller('/auth')
export class AuthController extends BaseController {
    constructor(
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.AuthService) private authService: AuthService
    ) {
        super();
    }

    @Get('/is-authenticated')
    isAuthenticated(req: Request, res: Response) {
        if (!req.session.user) {
            return res.status(400).send({ message: notAuthenticatedError });
        }
        res.send(req.session.user);
    }

    @Post('/login', [new BodyValidation(UserLoginDto)])
    async login(req: Request, res: Response) {
        const user = await this.userService.findUserByParam({
            email: req.body.email,
        });

        if (!user) {
            return res.status(400).send({ message: invalidCredentialsError });
        }
        const validPass = await user.verifyPassword(req.body.password);
        if (!validPass) {
            return res.status(400).send({ message: invalidCredentialsError });
        }

        req.session.user = user.email;
        res.send(user);
    }

    @Post('/register', [new BodyValidation(UserDto)])
    async register(req: Request, res: Response) {
        const oldUser = await this.userService.findUserByParam({
            email: req.body.email,
        });
        if (oldUser) {
            return res.status(400).send({ message: emailAlreadyInUseError });
        }

        const user = await this.userService.createUser(req.body);

        req.session.user = user.email;
        res.status(201).send(user);
    }

    @Post('/logout')
    async logout(req: Request, res: Response) {
        req.session.destroy((err) => {
            console.log(err);
        });

        res.redirect('/');
    }

    // To be completed and moved to different controller
    @Get('/github')
    async authGithubFlow(req: Request, res: Response) {
        res.redirect(`${authorizationPath}?client_id=${process.env.CLIENT_ID}`);
    }

    // To be completed and moved to different controller
    @Get('/oauth-github')
    async oauthGithub(req: Request, res: Response) {
        if (!req.query.code) {
            return res.status(500).send(gitHubUserCodeError);
        }
        const token = await this.authService.accessTokenRequest(
            String(req.query.code)
        );
        const userProfile = await this.authService.gitHubProfileRequest(token);

        res.send(userProfile);
    }
}
