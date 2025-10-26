import {RestApplication} from './rest/index.js';
import 'reflect-metadata';
import {Component} from './shared/types/index.js';
import {createRestApplicationContainer} from './rest/rest.container.js';
import {createUserContainer} from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';

async function bootstrap() {
  const restApplicationContainer = createRestApplicationContainer();
  const userContainer = createUserContainer(restApplicationContainer);
  const offerContainer = createOfferContainer(userContainer);
  const app = offerContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
