"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyValidationMiddleware = void 0;
class BodyValidationMiddleware {
    constructor(validateFields) {
        this.validateFields = validateFields;
    }
    execute(req, res, next) {
        const missedFields = [];
        this.validateFields.forEach((field) => {
            if (!req.body[field]) {
                missedFields.push(field);
            }
        });
        if (missedFields.length) {
            return res
                .status(404)
                .send(`Fields are not provided in the body of request: ${missedFields.toString()}`);
        }
        next();
    }
}
exports.BodyValidationMiddleware = BodyValidationMiddleware;
