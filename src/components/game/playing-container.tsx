import { FC } from 'react';
import { GameData } from '../../util/types/data-types';
import { MapCanvas } from './map-canvas';

export interface PlayingContainer {
  game: GameData;
}

export const PlayingContainer: FC<PlayingContainer> = ({ game }) => {
  return (
    <MapCanvas game={game} width={game.map.config?.width * game.map.config.tilewidth} height={game.map.config.height * game.map.config.tileheight} />
  );
}
