import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { notAuthorizedError } from '../errors/errors.constants';
import { IMiddleware } from '../utils/interfaces/middleware.interface';

export class AuthRequiredMiddleware implements IMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        if (req.session.user) {
            return next();
        }
        res.send(403).send(notAuthorizedError);
    }
}
