import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {DocumentExists} from '../../types/index.js';

export interface OfferService extends DocumentExists{
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;


  find(): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  findByCount(count?: number): Promise<DocumentType<OfferEntity>[]>;

  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;

  addToFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null>;

  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateRating(offerId: string, newRating: number): Promise<void>
  exists(documentId: string): Promise<boolean>;
}
