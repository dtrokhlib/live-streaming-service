import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../utils/interfaces/middleware.interface';

export class BodyValidationMiddleware implements IMiddleware {
    private validateFields: string[];

    constructor(validateFields: string[]) {
        this.validateFields = validateFields;
    }

    execute(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        const missedFields: string[] = [];
        this.validateFields.forEach((field) => {
            if (!req.body[field]) {
                missedFields.push(field);
            }
        });

        if (missedFields.length) {
            return res
                .status(404)
                .send(
                    `Fields should be specified in the request body: ${missedFields.toString()}`
                );
        }

        next();
    }
}
