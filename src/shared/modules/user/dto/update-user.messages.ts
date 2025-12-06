export const UpdateUserValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  avatar: {
    invalidFormat: 'Avatar must be a valid URL or path (jpg/png)',
  },
} as const;
