﻿import {User} from './user.type';
import {Location} from './location.type';
import {ComfortType} from './comfort-type.enum';
import {HousingType} from './housing.type';
import {City} from './city.enum';


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
