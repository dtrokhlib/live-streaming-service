import { injectable } from 'inversify';
import { ObjectId } from 'mongoose';
import { UserDto } from './dto/user-create.dto';
import { IUserDocument } from './interfaces/user.interface';
import { User } from './User.model';

@injectable()
export class UserService {
    async findUsers(): Promise<IUserDocument[]> {
        return await User.find({});
    }

    async findUserByParam(param: Object): Promise<IUserDocument | null> {
        return await User.findOne({ ...param });
    }

    async findUserById(id: string): Promise<IUserDocument | null> {
        return await User.findById(id);
    }

    async createUser(data: UserDto): Promise<IUserDocument> {
        const newUser = User.build(data);
        await newUser.save();

        return newUser;
    }
}
