import {IsOptional, IsUrl, Length} from 'class-validator';
import {UpdateUserValidationMessage} from './update-user.messages.js';

export class UpdateUserDto {
  @IsOptional()
  @IsUrl()
  public avatar?: string;

  @IsOptional()
  @Length(1, 15, {message: UpdateUserValidationMessage.name.maxLength})
  public name?: string;
}
