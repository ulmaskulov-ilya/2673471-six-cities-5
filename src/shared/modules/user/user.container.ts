import {UserService} from './user-service.interface.js';
import {Component} from '../../types/index.js';
import {Container} from 'inversify';
import {DefaultUserService} from './default-user.service.js';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './user.entity.js';

export function createUserContainer(parent: Container) {
  const userContainer = new Container({parent});
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  return userContainer;
}
