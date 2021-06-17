import { ErrorData, GameData, MapData, UserData } from './data-types';

/**
 * Base API response data interface.
 */
export interface Response {
  [key: string]: any;
};

/**
 * Creation response data interface.
 * 
 * This API response is returned by any `POST` that creates a new resource.
 */
export interface CreationResponse extends Response {
  id: string;
}

/**
 * Error response data interface.
 * 
 * This API response is returned when any errors occurs.
 */
export interface ErrorResponse extends Response {
  errors: ErrorData[];
}

/**
 * User informations response data interface.
 * 
 * This API response is returned by `GET /users/userinfo`.
 */
export interface UserInfoResponse extends Response {
  user: UserData;
}

/**
 * Users response data interface.
 * 
 * This API response is returned by `GET /users`.
 */
export interface UsersResponse extends Response {
  users: UserData[];
}

/**
 * User response data interface.
 * 
 * This API response is returned by `GET /users/:id`.
 */
export interface UserResponse extends Response {
  user: UserData;
}

/**
 * Maps response data interface.
 * 
 * This API response is returned by `GET /maps`.
 */
export interface MapsResponse extends Response {
  maps: MapData[];
}

/**
 * Map response data interface.
 * 
 * This API response is returned by `GET /maps/:id`.
 */
export interface MapResponse extends Response {
  map: MapData;
}

/**
 * Games response data interface.
 * 
 * This API response is returned by `GET /games`.
 */
export interface GamesResponse extends Response {
  games: GameData[];
}

/**
 * Game response data interface.
 * 
 * This API response is returned by `GET /games/:id`.
 */
export interface GameResponse extends Response {
  game: GameData;
}

/**
 * Signin response data interface.
 * 
 * This API response is returned by `POST /auth/signin`.
 */
export interface SigninResponse extends Response {
  access_token: string;
  refresh_token: string;
}

/**
 * Signup response data interface.
 * 
 * This API response is returned by `POST /auth/signup`.
 */
export interface SignupResponse extends Response {
  access_token: string;
  refresh_token: string;
}

/**
 * Access token response data interface.
 * 
 * This API response is returned by `POST /auth/accessToken`.
 */
export interface AccessTokenResponse extends Response {
  access_token: string;
}
