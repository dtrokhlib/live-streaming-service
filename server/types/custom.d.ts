import { IUserDocument } from '../src/user/interfaces/user.interface';

declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument;
            token?: string;
        }
    }
}
