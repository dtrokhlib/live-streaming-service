import { Document, Model } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IUserDocument extends Document {
    username: string;
    email: string;
    password: string;
    verifyPassword: (password: string) => boolean;
}

export interface IUserModel extends Model<IUserDocument> {
    build: (data: IUser) => IUserDocument;
}
