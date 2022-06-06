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
import { AuthRequiredMiddleware } from '../middlewares/auth-required.middleware';

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
        if (!req.user) {
            return res.status(400).send({ message: notAuthenticatedError });
        }
        res.send(req.user);
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

        const token = await user.generateToken();

        res.send({ user, token });
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
        const token = await user.generateToken();

        res.send({ user, token });
    }

    @Post('/logout', [new AuthRequiredMiddleware()])
    async logout(req: Request, res: Response) {
        const user = req.user;
        await user!.destroyToken(req.token!);

        res.send();
    }

    @Post('/logout-all', [new AuthRequiredMiddleware()])
    async logoutAll(req: Request, res: Response) {
        const user = req.user;
        await user!.removeAllTokens();

        res.send();
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
