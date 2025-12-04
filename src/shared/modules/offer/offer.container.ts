import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {DefaultOfferService, OfferController, OfferEntity, OfferModel, OfferService} from './index.js';
import {Component} from '../../types/index.js';
import {Controller} from '../../libs/rest/index.js';

export function createOfferContainer(parent: Container) {
  const offerContainer = new Container({parent});

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  return offerContainer;
}
