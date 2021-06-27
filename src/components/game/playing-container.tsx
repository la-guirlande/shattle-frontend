import _ from 'lodash';
import { FC, useContext, useMemo, useState } from 'react';
import { ActionData, ActionType, GameData, TileData } from '../../util/types/data-types';
import { Button } from '../button';
import { AuthenticationContext } from '../contexts/authentication-context';
import { MapCanvas } from './map-canvas';

export interface PlayingContainer {
  game: GameData;
  onEndRound: (actions: ActionData[]) => void;
}

export const PlayingContainer: FC<PlayingContainer> = ({ game, onEndRound }) => {
  const { authUser } = useContext(AuthenticationContext);
  const [actions, setActions] = useState<ActionData[]>([]);

  const player = useMemo(() => {
    if (authUser) {
      return game.players.find(player => player.user.id === authUser.id);
    }
    return null;
  }, [authUser]);

  const handleMove = (tile: TileData) => {
    setActions((oldState => [...oldState, {
      type: ActionType.MOVE,
      to: tile
    }]));
  }

  return (
    <>
      <MapCanvas game={game} width={game.map.config?.width * game.map.config.tilewidth} height={game.map.config.height * game.map.config.tileheight} />
      <Button onClick={() => onEndRound(actions)}>Terminer le tour</Button>
      <Button onClick={() => handleMove(game.map.mapTiles[_.random(0, game.map.mapTiles.length - 1)])}>Move (WIP)</Button>
    </>
  );
}
