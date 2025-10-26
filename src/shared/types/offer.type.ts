import {User} from './user.type.js';
import {Location} from './location.type.js';
import {ComfortType} from './comfort-type.enum.js';
import {HousingType} from './housing.type.js';
import {City} from './city.enum.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  maxGuests: number;
  price: number;
  comforts: ComfortType[];
  author: User;
  commentsCount: number;
  location: Location;
};
