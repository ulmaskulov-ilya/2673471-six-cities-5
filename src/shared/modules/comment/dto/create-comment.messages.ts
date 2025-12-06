export const CreateCommentValidationMessage = {
  text: {
    minLength: 'Minimum comment text length must be 5',
    maxLength: 'Maximum comment text length must be 1024',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  authorId: {
    invalidId: 'AuthorId field must be a valid ID',
  },
  offerId: {
    invalidId: 'OfferId field must be a valid ID',
  },
} as const;
