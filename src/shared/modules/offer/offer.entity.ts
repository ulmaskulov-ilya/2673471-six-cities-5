import {City, ComfortType, HousingType, Location} from '../../types/index.js';
import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public title: string;

  @prop({required: true})
  public description: string;

  @prop({required: true})
  public postDate: Date;

  @prop({
    type: () => String,
    enum: City,
    required: true
  })
  public city: City;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true})
  public images: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public rating: number;

  @prop({
    type: () => String,
    enum: HousingType,
    required: true
  })
  public housingType: HousingType;

  @prop({required: true})
  public rooms: number;

  @prop({required: true})
  public maxGuests: number;

  @prop({required: true})
  public price: number;

  @prop({required: true})
  public comforts: ComfortType[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount: number;

  @prop({required: true})
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
