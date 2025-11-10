import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/index.js';
import {OfferEntity} from '../offer/index.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true})
  public text: string;

  @prop({required: true})
  public rating: number;

  @prop({
    ref: () => UserEntity,
    required: true
  })
  public authorId!: Ref<UserEntity>;

  @prop({
    ref: () => OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);

