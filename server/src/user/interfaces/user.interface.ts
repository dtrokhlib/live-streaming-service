import { Document, Model } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    streamKey?: string;
    tokens?: [
        {
            token: string;
        }
    ];
}

export interface IUserDocument extends Document {
    username: string;
    email: string;
    password: string;
    streamKey?: string;
    tokens?: [
        {
            token: string;
        }
    ];
    verifyPassword: (password: string) => boolean;
    generateToken: () => string;
    destroyToken: (token: string) => void;
    removeAllTokens: () => void;
}

export interface IUserModel extends Model<IUserDocument> {
    build: (data: IUser) => IUserDocument;
    verifyToken: (token: string) => null | IUserDocument;
}
