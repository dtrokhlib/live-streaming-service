"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdValidationMiddleware = void 0;
const mongoose_1 = require("mongoose");
class ObjectIdValidationMiddleware {
    execute(req, res, next) {
        if (!req.params.id) {
            return next();
        }
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            return res
                .status(404)
                .send(`Invalid Object Id provided to the request path}`);
        }
        next();
    }
}
exports.ObjectIdValidationMiddleware = ObjectIdValidationMiddleware;
