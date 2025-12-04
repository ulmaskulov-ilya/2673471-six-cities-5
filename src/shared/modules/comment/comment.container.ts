import {Container} from 'inversify';
import {DefaultCommentService, CommentEntity, CommentModel, CommentService} from './index.js';
import {Component} from '../../types/index.js';
import {types} from '@typegoose/typegoose';

export function createCommentContainer(parent: Container) {
  const commentContainer = new Container({parent});

  commentContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
