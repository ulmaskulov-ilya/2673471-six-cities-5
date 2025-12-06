import {City, ComfortType, HousingType, Location} from '../../../types/index.js';
import {UpdateOfferValidationMessage} from './update-offer.messages.js';
import {
  ArrayMaxSize,
  ArrayMinSize, IsArray,
  IsBoolean,
  IsDateString,
  IsEnum, IsInt,
  IsLatitude,
  IsLongitude, IsNumber, IsObject,
  IsOptional,
  IsUrl, Max,
  MaxLength, Min,
  MinLength, ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';

class LocationDto implements Location {
  @IsLatitude({message: UpdateOfferValidationMessage.location.invalidFormat})
  public latitude: number;

  @IsLongitude({message: UpdateOfferValidationMessage.location.invalidFormat})
  public longitude: number;
}

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: UpdateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: UpdateOfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: UpdateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: UpdateOfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: UpdateOfferValidationMessage.postDate.invalidFormat})
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, {message: UpdateOfferValidationMessage.city.invalid})
  public city?: City;

  @IsOptional()
  @IsUrl({}, {message: UpdateOfferValidationMessage.previewImage.invalidFormat})
  public previewImage?: string;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.images.invalidFormat})
  @ArrayMinSize(6, {message: UpdateOfferValidationMessage.images.arrayLength})
  @ArrayMaxSize(6, {message: UpdateOfferValidationMessage.images.arrayLength})
  @IsUrl({}, {each: true, message: UpdateOfferValidationMessage.images.invalidFormat})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber({maxDecimalPlaces: 1}, {message: UpdateOfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.rating.minValue})
  @Max(5, {message: UpdateOfferValidationMessage.rating.maxValue})
  public rating?: number;

  @IsOptional()
  @IsEnum(HousingType, {message: UpdateOfferValidationMessage.housingType.invalid})
  public housingType?: HousingType;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.rooms.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.rooms.minValue})
  @Max(8, {message: UpdateOfferValidationMessage.rooms.maxValue})
  public rooms?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.maxGuests.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.maxGuests.minValue})
  @Max(10, {message: UpdateOfferValidationMessage.maxGuests.maxValue})
  public maxGuests?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: UpdateOfferValidationMessage.price.minValue})
  @Max(100000, {message: UpdateOfferValidationMessage.price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.comforts.invalidFormat})
  @ArrayMinSize(1, {message: UpdateOfferValidationMessage.comforts.minItems})
  @IsEnum(ComfortType, {each: true, message: UpdateOfferValidationMessage.comforts.invalidFormat})
  public comforts?: ComfortType[];

  @IsOptional()
  @IsObject({message: UpdateOfferValidationMessage.location.invalidFormat})
  @ValidateNested()
  @Type(() => LocationDto)
  public location?: LocationDto;
}
