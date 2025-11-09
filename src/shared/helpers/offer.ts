import {City, ComfortType, HousingType, Location, Offer, User} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    housingType,
    rooms,
    maxGuests,
    price,
    comforts,
    authorName,
    authorEmail,
    authorAvatar,
    userType,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');
  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    housingType: housingType as HousingType,
    rooms: parseInt(rooms, 10),
    maxGuests: parseInt(maxGuests, 10),
    price: parseInt(price, 10),
    comforts: comforts.split(';').map((comfort) => comfort as ComfortType),
    author: {name: authorName, email: authorEmail, avatar: authorAvatar, userType} as User,
    commentsCount: 228,
    location: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)} as Location,
  };
}
