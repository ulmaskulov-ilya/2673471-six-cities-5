import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {Component} from '../../types/index.js';
import {Controller} from '../../libs/rest/index.js';
import {UserController, UserEntity, UserModel, UserService, DefaultUserService} from './index.js';

export function createUserContainer(parent: Container) {
  const userContainer = new Container({parent});
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();
  return userContainer;
}
