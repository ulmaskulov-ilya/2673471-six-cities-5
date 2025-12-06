export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'PostDate must be a valid ISO date string',
  },
  city: {
    invalid: 'City must be one of the six specified city values',
  },
  previewImage: {
    invalidFormat: 'PreviewImage must be a valid URL or path',
  },
  images: {
    invalidFormat: 'Images must be an array of strings',
    arrayLength: 'Images array must contain exactly 6 elements',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean',
  },
  rating: {
    invalidFormat: 'Rating must be a number between 1 and 5, with max 1 decimal place',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  housingType: {
    invalid: 'HousingType must be one of: apartment, house, room, hotel',
  },
  rooms: {
    invalidFormat: 'Rooms must be an integer',
    minValue: 'Minimum number of rooms is 1',
    maxValue: 'Maximum number of rooms is 8',
  },
  maxGuests: {
    invalidFormat: 'MaxGuests must be an integer',
    minValue: 'Minimum number of guests is 1',
    maxValue: 'Maximum number of guests is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  comforts: {
    invalidFormat: 'Comforts must be an array of valid ComfortType values',
    minItems: 'Must select at least one comfort',
  },
  authorId: {
    invalidId: 'AuthorId field must be a valid user ID',
  },
  location: {
    invalidFormat: 'Location must contain valid latitude and longitude numbers',
  }
} as const;
