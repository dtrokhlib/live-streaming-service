import { injectable } from 'inversify';
import { ObjectId } from 'mongoose';
import { IUserDocument } from './interfaces/user.interface';
import { User } from './User.model';

@injectable()
export class UserService {
    async findUsers(): Promise<IUserDocument[]> {
        return await User.find({});
    }

    async findUserById(id: ObjectId): Promise<IUserDocument | null> {
        return await User.findById(id)
    }
}
