import { Request, Response, NextFunction } from 'express';
import { notAuthorizedError } from '../errors/errors.constants';
import { IMiddleware } from '../utils/interfaces/middleware.interface';

export class AuthRequiredMiddleware implements IMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            next();
        } else {
            res.status(403).send({ message: notAuthorizedError });
        }
    }
}
