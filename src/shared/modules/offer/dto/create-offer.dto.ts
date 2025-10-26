import {City, ComfortType, HousingType, Location} from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public housingType: HousingType;
  public rooms: number;
  public maxGuests: number;
  public price: number;
  public comforts: ComfortType[];
  public authorId: string;
  public commentsCount: number;
  public location: Location;
}
