import { useEffect, useState } from 'react';
import { Config } from '../util/config';
import { GameData } from '../util/types/data-types';
import { GameResponse } from '../util/types/response-types'
import { Status, useQuery } from './query-hooks'

/**
 * Game hook.
 * 
 * This hook is used to keep a game state and refresh it.
 * 
 * @param gameId Game ID
 * @returns [Game, refresh function]
 */
export const useGame = (gameId?: string): [GameData, (gameId?: string) => void] => {
  const gameQuery = useQuery<GameResponse>();
  const [game, setGame] = useState<GameData>(null);

  useEffect(() => {
    switch (gameQuery.status) {
      case Status.INIT:
        refresh();
        break;
      case Status.SUCCESS:
        setGame(gameQuery.response.game);
        break;
      case Status.ERROR:
        console.error(gameQuery.errorResponse.errors);
        break;
    }
  }, [gameQuery.status]);

  function refresh(refreshGameId?: string) {
    if (refreshGameId != null || gameId != null) {
      gameQuery.get(`${Config.API_URL}/games/${refreshGameId || gameId}`);
    }
  }

  return [game, refresh];
}
