import {CITIES, City, ComfortType, HousingType, MockServerData} from '../../types/index.js';
import {OfferGeneratorInterface} from './offer-generator.interface.js';
import {getRandomItem, generateRandomValue, getRandomItems} from '../../helpers/index.js';
import dayjs from 'dayjs';
import {UserType} from '../../types/user-type.enum.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_PRICE = 200;
const MAX_PRICE = 52000;

export class TSVOfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockServerData) {
  }

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem([City.Amsterdam, City.Paris, City.Cologne, City.Brussels, City.Dusseldorf, City.Hamburg]).toString();
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = getRandomItem(this.mockData.images);
    const isPremium = getRandomItem(['true', 'false']);
    const isFavorite = getRandomItem(['true', 'false']);
    const rating = generateRandomValue(1.0, 5.0, 1);
    const housingType = getRandomItem([HousingType.House, HousingType.Apartment, HousingType.Hotel, HousingType.Room]);
    const rooms = generateRandomValue(1, 5);
    const maxGuests = generateRandomValue(1, 10);
    const price = getRandomItem([MIN_PRICE, MAX_PRICE]).toString();
    const comfortType = getRandomItems([ComfortType.Breakfast, ComfortType.Fridge,
      ComfortType.AirConditioning, ComfortType.LaptopFriendlyWorkspace,
      ComfortType.Towels, ComfortType.BabySeat,
      ComfortType.Washer]).join(';');
    const authorName = getRandomItem(this.mockData.authors);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = generateRandomValue(1000, 9999);
    const userType = getRandomItem([UserType.Pro, UserType.Normal]);
    const commentsCount = 0;
    const location = CITIES[city as City];
    return [title, description,
      postDate, city,
      previewImage, images,
      isPremium, isFavorite,
      rating, housingType,
      rooms, maxGuests,
      price, comfortType,
      authorName, email,
      avatar, password,
      userType, commentsCount,
      location.latitude, location.longitude].join('\t');
  }
}
