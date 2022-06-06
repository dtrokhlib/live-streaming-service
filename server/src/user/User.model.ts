import { model, Schema } from 'mongoose';
import { IUser, IUserDocument, IUserModel } from './interfaces/user.interface';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

const userSchema = new Schema(
    {
        email: String,
        username: String,
        password: String,
        streamKey: {
            type: String,
            required: false,
        },
        tokens: [
            {
                token: String,
            },
        ],
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
                delete ret.tokens;
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

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = await sign({ user: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });
    user.tokens.push({ token });
    await user.save();
    return token;
};

userSchema.statics.verifyToken = async function (token: string) {
    try {
        const payload = (await verify(token, process.env.JWT_SECRET!)) as {
            user: string;
        };

        const user = await User.findById(payload.user);
        if (!user || !user.tokens) {
            return null;
        }

        const tokenToUser = user.tokens.filter((item: any) => {
            return item.token === token;
        }).length;
        if (!tokenToUser) {
            return false;
        }

        return user;

    } catch (err) {
        return null;
    }
};

userSchema.methods.destroyToken = async function (token: string) {
    const user = this;
    user.tokens = user.tokens.filter((item: any) => item.token !== token);
    await user.save();
};

userSchema.methods.removeAllTokens = async function () {
    const user = this;
    user.tokens = [];
    await user.save();
};

export const User = model<IUserDocument, IUserModel>('User', userSchema);
