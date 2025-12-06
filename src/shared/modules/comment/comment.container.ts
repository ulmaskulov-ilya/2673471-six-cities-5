import {Container} from 'inversify';
import {DefaultCommentService, CommentEntity, CommentModel, CommentService} from './index.js';
import {Component} from '../../types/index.js';
import {types} from '@typegoose/typegoose';
import {Controller} from '../../libs/rest/index.js';
import CommentController from './comment.controller.js';

export function createCommentContainer(parent: Container) {
  const commentContainer = new Container({parent});

  commentContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<Controller>(Component.CommentController)
    .to(CommentController).inSingletonScope();
  return commentContainer;
}
