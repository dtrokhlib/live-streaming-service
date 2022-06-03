import { IsEmail, IsString, Length } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class UserLoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(4, 50)
    password: string;
}
