import {Container} from 'inversify';
import {DefaultOfferService, OfferEntity, OfferModel, OfferService} from './index.js';
import {Component} from '../../types/index.js';
import { types } from '@typegoose/typegoose';

export function createOfferContainer(parent: Container) {
  const offerContainer = new Container({parent});

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
