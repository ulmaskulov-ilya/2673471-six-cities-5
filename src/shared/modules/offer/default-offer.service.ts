import {OfferService, UpdateOfferDto} from './index.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {inject, injectable} from 'inversify';
import {Component, SortType} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_COUNT} from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result.populate('authorId');
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(id)
      .populate('authorId')
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate('authorId')
      .exec();
  }

  public async findByCount(count?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({postDate: SortType.Down})
      .limit(count ?? DEFAULT_OFFER_COUNT)
      .populate('authorId')
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('authorId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity, types.BeAnObject>[]> {
    return this.offerModel
      .find({city, isPremium: true})
      .sort({postDate: SortType.Down})
      .limit(DEFAULT_PREMIUM_COUNT)
      .populate('authorId')
      .exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity, types.BeAnObject>[]> {
    return this.offerModel
      .find({favoriteUserIds: userId})
      .sort({postDate: SortType.Down})
      .populate('authorId')
      .exec();
  }

  public async addToFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    const updated = await this.offerModel
      .findByIdAndUpdate(offerId, {
        $addToSet: {favoriteUserIds: userId},
      }, {new: true})
      .populate('authorId')
      .exec();

    if (updated) {
      const isFav = (updated.favoriteUserIds && updated.favoriteUserIds.length > 0) ?? false;
      if (updated.isFavorite !== isFav) {
        await this.offerModel.findByIdAndUpdate(offerId, {isFavorite: isFav}).exec();
      }
    }

    return updated;
  }

  public async removeFromFavorites(offerId: string, userId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    const updated = await this.offerModel
      .findByIdAndUpdate(offerId, {
        $pull: {favoriteUserIds: userId},
      }, {new: true})
      .populate('authorId')
      .exec();

    if (updated) {
      const isFav = (updated.favoriteUserIds && updated.favoriteUserIds.length > 0) ?? false;
      if (updated.isFavorite !== isFav) {
        await this.offerModel.findByIdAndUpdate(offerId, {isFavorite: isFav}).exec();
      }
    }

    return updated;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentsCount: 1,
        }
      }).exec();
  }

  public async updateRating(offerId: string, newRating: number): Promise<void> {
    const offer = await this.offerModel.findById(offerId).exec();
    if (!offer) {
      return;
    }

    const oldRating = offer.rating ?? 0;
    const oldCount = offer.commentsCount ?? 0;
    const newCount = oldCount + 1;

    const updatedRating = Number(((oldRating * oldCount + newRating) / newCount).toFixed(1));

    await this.offerModel.findByIdAndUpdate(offerId, {rating: updatedRating}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
