import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {User, UserType} from '../../types/index.js';
import {createSHA256} from '../../helpers/index.js';

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    default: ''
  })
  public name: string;

  @prop({
    required: true,
    unique: true
  })
  public email: string;

  @prop({
    required: false,
    default: ''
  })
  public avatar: string;

  @prop({
    required: true,
    default: ''
  })
  private password?: string;

  @prop({
    type: () => String,
    required: true,
    enum: UserType,
    default: UserType.Normal
  })
  public userType!: UserType;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
