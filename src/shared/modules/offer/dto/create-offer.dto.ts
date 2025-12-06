import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNumber,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsObject,
  IsLatitude,
  IsLongitude
} from 'class-validator';
import {City, ComfortType, HousingType, Location} from '../../../types/index.js';
import {CreateOfferValidationMessage} from './create-offer.messages.js';
import {Type} from 'class-transformer';

class LocationDto implements Location {
  @IsLatitude({message: CreateOfferValidationMessage.location.invalidFormat})
  public latitude: number;

  @IsLongitude({message: CreateOfferValidationMessage.location.invalidFormat})
  public longitude: number;
}

export class CreateOfferDto {
  @MinLength(10, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.title.maxLength})
  public title: string;

  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.postDate.invalidFormat})
  public postDate: Date;

  @IsEnum(City, {message: CreateOfferValidationMessage.city.invalid})
  public city: City;

  @IsUrl({}, {message: CreateOfferValidationMessage.previewImage.invalidFormat})
  public previewImage: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.images.arrayLength})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.images.arrayLength})
  @IsUrl({}, {each: true, message: CreateOfferValidationMessage.images.invalidFormat})
  public images: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  @IsNumber({maxDecimalPlaces: 1}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.rating.minValue})
  @Max(5, {message: CreateOfferValidationMessage.rating.maxValue})
  public rating: number;

  @IsEnum(HousingType, {message: CreateOfferValidationMessage.housingType.invalid})
  public housingType: HousingType;

  @IsInt({message: CreateOfferValidationMessage.rooms.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.rooms.minValue})
  @Max(8, {message: CreateOfferValidationMessage.rooms.maxValue})
  public rooms: number;

  @IsInt({message: CreateOfferValidationMessage.maxGuests.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.maxGuests.minValue})
  @Max(10, {message: CreateOfferValidationMessage.maxGuests.maxValue})
  public maxGuests: number;

  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.comforts.invalidFormat})
  @ArrayMinSize(1, {message: CreateOfferValidationMessage.comforts.minItems})
  @IsEnum(ComfortType, {each: true, message: CreateOfferValidationMessage.comforts.invalidFormat})
  public comforts: ComfortType[];

  @IsMongoId({message: CreateOfferValidationMessage.authorId.invalidId})
  public authorId: string;

  public commentsCount: number;

  @IsObject({message: CreateOfferValidationMessage.location.invalidFormat})
  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;
}
