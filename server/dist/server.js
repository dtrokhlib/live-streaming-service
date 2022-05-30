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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appBindings = void 0;
require("dotenv/config");
const http_1 = require("http");
const app_1 = require("./app");
const types_1 = require("./types");
const User_controller_1 = __importDefault(require("./user/User.controller"));
const inversify_1 = require("inversify");
const User_service_1 = require("./user/User.service");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.UserController).to(User_controller_1.default);
    bind(types_1.TYPES.UserService).to(User_service_1.UserService);
    bind(types_1.TYPES.Application).to(app_1.App).inSingletonScope();
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    const server = new http_1.Server(app.instance);
    server.listen(process.env.PORT, () => {
        console.log(`Server has started on port: ${process.env.PORT}`);
    });
});
bootstrap();
