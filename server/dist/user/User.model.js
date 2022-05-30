"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    email: String,
    username: String,
    password: String,
});
userSchema.statics.build = (data) => {
    return new exports.User(data);
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        try {
            const hashPassword = yield (0, bcrypt_1.hash)(this.password, process.env.SALT_ROUNDS);
            user.password = hashPassword;
            next();
        }
        catch (err) {
            console.log(err);
        }
    });
});
userSchema.methods.verifyPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, bcrypt_1.compare)(password, this.password);
            return true;
        }
        catch (err) {
            return false;
        }
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
