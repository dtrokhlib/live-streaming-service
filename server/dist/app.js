"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.App = exports.redisClient = exports.RedisStore = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("redis");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
require("reflect-metadata");
const User_controller_1 = __importDefault(require("./user/User.controller"));
const inversify_1 = require("inversify");
const types_1 = require("./types");
const bind_routes_1 = require("./utils/bind-routes");
exports.RedisStore = (0, connect_redis_1.default)(express_session_1.default);
exports.redisClient = (0, redis_1.createClient)();
let App = class App {
    constructor(userController) {
        this.userController = userController;
        this._instance = (0, express_1.default)();
        this.appSet();
        this.appUse();
        this.useRoutes();
    }
    get instance() {
        return this._instance;
    }
    appSet() {
        this._instance.set('view engine', 'ejs');
        this._instance.set('views', path_1.default.join(__dirname, './views'));
    }
    useRoutes() {
        const userRouter = (0, bind_routes_1.bindRoutes)(this.userController, User_controller_1.default);
        this._instance.use(userRouter.basePath, userRouter.router);
    }
    appUse() {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.redisClient.connect();
            this._instance.use((0, express_session_1.default)({
                store: new exports.RedisStore({ client: exports.redisClient }),
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: false,
                    httpOnly: false,
                    maxAge: 1000 * 60 * 10,
                },
            }));
            this._instance.use((0, cookie_parser_1.default)());
            this._instance.use(express_1.default.static('public'));
            this._instance.use((0, connect_flash_1.default)());
            this._instance.use(express_1.default.json());
            this._instance.use(express_1.default.urlencoded({ extended: true }));
        });
    }
};
App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserController)),
    __metadata("design:paramtypes", [User_controller_1.default])
], App);
exports.App = App;
