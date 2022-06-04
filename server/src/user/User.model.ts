import { model, Schema } from 'mongoose';
import { IUser, IUserDocument, IUserModel } from './interfaces/user.interface';
import { hash, compare } from 'bcrypt';

const userSchema = new Schema(
    {
        email: String,
        username: String,
        password: String,
        streamKey: {
            type: String,
            required: false,
        },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

userSchema.statics.build = (data: IUser): IUserDocument => {
    return new User(data);
};

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const hashPassword = await hash(
            this.password,
            Number(process.env.SALT_ROUNDS!)
        );
        user.password = hashPassword;
        next();
    } catch (err) {
        console.log(err);
    }
});

userSchema.methods.verifyPassword = async function (
    password: string
): Promise<boolean> {
    try {
        await compare(password, this.password);
        return true;
    } catch (err) {
        return false;
    }
};

export const User = model<IUserDocument, IUserModel>('User', userSchema);
