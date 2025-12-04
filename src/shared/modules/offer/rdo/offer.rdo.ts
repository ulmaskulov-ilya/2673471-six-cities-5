import {Expose, Type} from 'class-transformer';
import {City, HousingType, Location} from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public price: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public postDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public commentsCount: number;

  @Expose()
  @Type(() => Object)
  public location: Location;
}
