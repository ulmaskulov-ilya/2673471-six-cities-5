export const CreateUserValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  email: {
    invalidFormat: 'Email must be a valid address',
  },
  avatar: {
    invalidFormat: 'Avatar must be a valid file path or URL (.jpg/.png)',
  },
  password: {
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  },
  userType: {
    invalid: 'UserType must be one of the specified values (basic, pro)',
  },
} as const;
