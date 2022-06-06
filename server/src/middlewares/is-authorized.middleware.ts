import { Request, Response, NextFunction } from 'express';
import { User } from '../user/User.model';
import { IMiddleware } from '../utils/interfaces/middleware.interface';

export class IsAuthorizedMiddleware implements IMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers['authorization']
                ? req.headers['authorization'].split(' ')[1]
                : false;
            if (!token) {
                return next();
            }
            const user = await User.verifyToken(token);
            if (!user) {
                return next();
            }
            req.token = token;
            req.user = user;
            next();
        } catch (err) {
            next();
        }
    }
}
