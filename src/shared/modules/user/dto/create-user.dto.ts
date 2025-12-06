import {UserType} from '../../../types/index.js';
import {CreateUserValidationMessage} from './create-user.messages.js';
import {IsEmail, IsEnum, IsUrl, Length} from 'class-validator';

export class CreateUserDto {
  @Length(1, 15, {message: CreateUserValidationMessage.name.maxLength})
  public name: string;

  @IsEmail({}, {message: CreateUserValidationMessage.email.invalidFormat})
  public email: string;

  @IsUrl({}, {message: CreateUserValidationMessage.avatar.invalidFormat})
  public avatar: string;

  @Length(6, 12, {message: CreateUserValidationMessage.password.minLength})
  public password: string;

  @IsEnum(UserType, {message: CreateUserValidationMessage.userType.invalid})
  public userType: UserType;
}
