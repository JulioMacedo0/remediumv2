export type UserType = {
  id: string;
  username: string;
  email: string;
  languageTag: string;
  timeZone: string;
  expo_token?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
  languageTag?: string;
  timeZone?: string;
  expo_token?: string;
};

export type UpdateUserPayload = {
  username?: string;
  email?: string;
  languageTag?: string;
  timeZone?: string;
  expo_token?: string;
};
