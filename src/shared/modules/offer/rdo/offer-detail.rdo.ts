import {Expose, Type} from 'class-transformer';
import {ComfortType, City, HousingType, Location} from '../../../types/index.js';
import {UserRdo} from '../../user/rdo/user.rdo.js';

export class OfferDetailRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public rooms: number;

  @Expose()
  public maxGuests: number;

  @Expose()
  public price: number;

  @Expose()
  public comforts: ComfortType[];

  @Expose()
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public commentsCount: number;

  @Expose()
  @Type(() => Object)
  public location: Location;
}
