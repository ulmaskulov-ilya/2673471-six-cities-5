import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;


  find(): Promise<DocumentType<OfferEntity>[]>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findByCount(count?: number): Promise<DocumentType<OfferEntity>[]>;

  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  findFavourites(userId: string): Promise<DocumentType<OfferEntity>[]>;

  addToFavourites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavourites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;

  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateRating(offerId: string, newRating: number): Promise<void>
  exists(documentId: string): Promise<boolean>;
}
