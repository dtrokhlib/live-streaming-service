import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { IMiddleware } from '../utils/interfaces/middleware.interface';

export class ObjectIdValidationMiddleware implements IMiddleware {
    execute(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return next();
        }

        if (!isValidObjectId(req.params.id)) {
            return res
                .status(404)
                .send(`Invalid Object Id provided to the request path}`);
        }
        next();
    }
}
