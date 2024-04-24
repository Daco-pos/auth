export const errorKeys = {
  userExists: 'An account with email is already exists.',
  accessTokenUnauthorized: 'Access token is unauthorized.',
  userNotFound: 'User not found.',
  refreshTokenUnauthorized: 'Refresh token is unauthorized.',
};

export const statusMessages = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'NonAuthoritativeInfo',
  204: 'NoContent',
  205: 'ResetContent',
  206: 'PartialContent',
};

export const IS_PUBLIC_KEY = 'isPublic';

export const isDev = process.env.NODE_ENV === 'development' ? true : false;

export enum TokenType {
  ACCESS_TOKEN = 'AccessToken',
  REFRESH_TOKEN = 'RefreshToken',
}

export enum PermissionModules {
  Admin = 'Admin',
  Users = 'Users',
  Post = 'Post',
}
