import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
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
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
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
    this.addRoute({path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites});
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Patch,
      handler: this.addFavorite,
      middlewares: [
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    {body}: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async show(
    req: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const {offerId} = req.params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update(
    req: UpdateOfferRequest,
    res: Response,
  ): Promise<void> {
    const {offerId} = req.params as ParamOfferId;
    const {body} = req;

    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
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

    this.ok(res, fillDTO(OfferRdo, premiumOffers));
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const favoriteOffers = await this.offerService.findFavorites('userId');
    this.ok(res, fillDTO(OfferRdo, favoriteOffers));
  }

  public async addFavorite(req: Request, res: Response): Promise<void> {
    const {offerId} = req.params as ParamOfferId;
    const updatedOffer = await this.offerService.addToFavorites(offerId, 'userId');
    this.ok(res, fillDTO(OfferDetailRdo, updatedOffer));
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> {
    const {offerId} = req.params as ParamOfferId;
    const updatedOffer = await this.offerService.removeFromFavorites(offerId, 'userId');
    this.ok(res, fillDTO(OfferDetailRdo, updatedOffer));
  }

  public async getComments({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
