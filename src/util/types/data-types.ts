/**
 * ID interface.
 * 
 * This interface is used with data interfaces that have IDs by extending this.
 */
interface ID {
  id: string;
}

/**
 * Timestamps interface.
 * 
 * This interface is used with data interfaces that have timestamps by extending this.
 */
interface TimeStamps {
  createdAt: string;
  updatedAt: string;
}

/**
 * User data interface.
 */
export interface UserData extends ID, TimeStamps {
  name: string;
  role: string;
}

/**
 * Map data interface.
 */
export interface MapData extends ID, TimeStamps {
  name: string;
  config: {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    layers: ConfigLayerData[];
    tilesets: ConfigTilesetData[];
  };
  tilesets: TilesetData[];
  maxPlayers: number;
  mapTiles: TileData[];
  tilesetTiles: TileData[];
}

/**
 * Map configuration data.
 */
export interface ConfigData {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  layers: ConfigLayerData[];
  tilesets: ConfigTilesetData[];
}

/**
 * Map tilesets data.
 */
export interface TilesetData {
  name: string;
  data: string;
}

/**
 * Map tiles data.
 */
export interface TileData {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Map configuration layer data.
 */
export interface ConfigLayerData {
  name: string;
  type: 'tilelayer' | 'objectgroup';
  x: number;
  y: number;
  width?: number;
  height?: number;
  opacity: number;
  visible: boolean;
  data?: number[];
  objects?: GameObjectData[];
}

/**
 * Map configuration tileset data.
 */
export interface ConfigTilesetData {
  name: string;
  columns: number;
  firstgid: number;
  imagewidth: number;
  imageheight: number;
  tilewidth: number;
  tileheight: number;
  tilecount: number;
  margin: number;
  spacing: number;
}

/**
 * Map configuration layer game object data.
 */
export interface GameObjectData {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visible: boolean;
  point: boolean;
}

/**
 * Game data.
 */
export interface GameData extends ID {
  author: UserData;
  currentPlayer: UserData;
  status?: GameStatus;
  code?: string;
  map: MapData;
  players: UserData[];
  history?: HistoryData[];
}

/**
 * Game status enum.
 */
export enum GameStatus {
  WAITING = 0,
  IN_PROGRESS = 1,
  FINISHED = 2
}

export interface HistoryData {
  player: UserData;
  actions: ActionData[];
}

/**
 * Game history action.
 */
 export interface ActionData {
  type: ActionType;
  to?: number;
  spell?: Spell;
  direction?: Direction;
}

/**
 * Action type.
 */
export enum ActionType {
  MOVE = 0,
  SPELL = 1
}

/**
 * Spell.
 */
export enum Spell {
  BASIC = 0
}

/**
 * Direction.
 */
export enum Direction {
  SELF = 0,
  NORTH = 1,
  EAST = 2,
  SOUTH = 3,
  WEST = 4
}

/**
 * Error data interface.
 */
export interface ErrorData {
  error: ErrorCode;
  error_description: string;
}

/**
 * Error code type.
 */
export type ErrorCode =
  'access_denied'
  | 'invalid_client'
  | 'invalid_grant'
  | 'invalid_request'
  | 'invalid_scope'
  | 'network_error'
  | 'not_found'
  | 'server_error'
  | 'temporarily_unavailable'
  | 'unauthorized_client'
  | 'unsupported_grant_type'
  | 'unsupported_response_type'
  | 'validation_failed';
