import { IsEmail, IsString, Length } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class UserDto implements IUser {
    @IsString()
    @Length(4, 50)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(4, 50)
    password: string;
}
