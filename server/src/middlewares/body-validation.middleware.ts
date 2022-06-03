import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../utils/interfaces/middleware.interface';

export class BodyValidation implements IMiddleware {
    private classValidator: any;

    constructor(classValidator: any) {
        this.classValidator = new classValidator();
    }

    async execute(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        Object.assign(this.classValidator, req.body);
        try {
            await validateOrReject(this.classValidator);
        } catch(err) {
            
            return res.status(400).send(err);
        }
        next();
    }
}
