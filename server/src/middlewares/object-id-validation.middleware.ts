import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { IMiddleware } from '../utils/interfaces/middleware.interface';

export class ObjectIdValidation implements IMiddleware {
    execute(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return next();
        }

        if (!isValidObjectId(req.params.id)) {
            return res
                .status(400)
                .send({
                    message: `Invalid Object Id provided as url parameter`,
                });
        }
        next();
    }
}
