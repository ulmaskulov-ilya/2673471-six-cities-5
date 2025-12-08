import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod, PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CreateOfferDto, OfferRdo, OfferService, UpdateOfferDto} from './index.js';
import {fillDTO} from '../../helpers/index.js';
import {StatusCodes} from 'http-status-codes';
import {CreateOfferRequest} from './create-offer-request.type.js';
import {ParamOfferId} from './param-offerId.type.js';
import {UpdateOfferRequest} from './update-offer-request.type.js';
import {OfferDetailRdo} from './rdo/offer-detail.rdo.js';
import {CommentRdo, CommentService} from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.getPremium});
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Patch,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  private applyFavoriteFlag<T extends { favoriteUserIds?: unknown; isFavorite?: boolean }>(
    items: T[],
    userId?: string
  ): T[] {
    return items.map((item) => {
      const favIds = Array.isArray(item.favoriteUserIds) ? item.favoriteUserIds : [];
      const isFav = !!(userId && favIds.some((id) => String(id) === String(userId)));
      return { ...item, isFavorite: isFav };
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const userId = req.tokenPayload?.id;
    const prepared = userId ? this.applyFavoriteFlag(offers as any[], userId) : offers.map((o) => ({...o, isFavorite: false}));
    const responseData = fillDTO(OfferRdo, prepared);
    this.ok(res, responseData);
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, authorId: tokenPayload.id });
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async show(
    req: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const {offerId} = req.params;
    const userId = req.tokenPayload?.id;
    const offer = await this.offerService.findById(offerId, userId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update(
    req: UpdateOfferRequest,
    res: Response,
  ): Promise<void> {
    const {offerId} = req.params as ParamOfferId;
    const {body} = req;

    const updatedOffer = await this.offerService.updateById(offerId, body);
    const userId = req.tokenPayload?.id;
    const prepared = updatedOffer ? (userId ? this.applyFavoriteFlag([updatedOffer] as any[], userId)[0] : { ...updatedOffer, isFavorite: false }) : null;
    this.ok(res, fillDTO(OfferRdo, prepared));
  }

  public async delete(
    req: Request,
    res: Response,
  ): Promise<void> {
    const {offerId} = req.params as ParamOfferId;
    await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, {});
  }

  public async getPremium(req: Request, res: Response): Promise<void> {
    const {city} = req.query;

    if (!city || typeof city !== 'string') {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Query parameter "city" is required and must be a string.',
        'OfferController'
      );
    }

    const premiumOffers = await this.offerService.findPremiumByCity(city);

    if (premiumOffers.length === 0) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `No premium offers found for city «${city}».`,
        'OfferController'
      );
    }

    const userId = req.tokenPayload?.id;
    const prepared = userId ? this.applyFavoriteFlag(premiumOffers as any[], userId) : premiumOffers.map((o) => ({...o, isFavorite: false}));
    this.ok(res, fillDTO(OfferRdo, prepared));
  }

  public async getFavorites(req: Request, res: Response): Promise<void> {
    const userId = req.tokenPayload?.id;
    const favoriteOffers = await this.offerService.findFavorites(String(userId));
    const prepared = this.applyFavoriteFlag(favoriteOffers as any[], String(userId));
    this.ok(res, fillDTO(OfferRdo, prepared));
  }

  public async addFavorite(req: Request, res: Response): Promise<void> {
    const {offerId} = req.params as ParamOfferId;
    const userId = req.tokenPayload?.id;
    const updatedOffer = await this.offerService.addToFavorites(offerId, String(userId));
    const prepared = updatedOffer ? this.applyFavoriteFlag([updatedOffer] as any[], String(userId))[0] : null;
    this.ok(res, fillDTO(OfferDetailRdo, prepared));
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> {
    const {offerId} = req.params as ParamOfferId;
    const userId = req.tokenPayload?.id;
    const updatedOffer = await this.offerService.removeFromFavorites(offerId, String(userId));
    const prepared = updatedOffer ? this.applyFavoriteFlag([updatedOffer] as any[], String(userId))[0] : null;
    this.ok(res, fillDTO(OfferDetailRdo, prepared));
  }

  public async getComments({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
