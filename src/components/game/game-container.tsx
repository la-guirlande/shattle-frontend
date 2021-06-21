import { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Status, useQuery } from '../../hooks/query-hooks';
import { Config } from '../../util/config';
import { GameData, GameStatus } from '../../util/types/data-types';
import { GameResponse } from '../../util/types/response-types';
import { PlayingContainer } from './playing-container';
import { WaitingRoomContainer } from './waiting-room-container';

interface GameContainerProps {
  gameId: string;
}

export const GameContainer: FC<RouteComponentProps<GameContainerProps>> = ({ match }) => {
  const gameQuery = useQuery<GameResponse>();
  const [game, setGame] = useState<GameData>(null);

  useEffect(() => {
    switch (gameQuery.status) {
      case Status.INIT:
        gameQuery.get(`${Config.API_URL}/games/${match.params.gameId}`);
        break;
      case Status.SUCCESS:
        setGame(gameQuery.response.game);
        break;
      case Status.ERROR:
        console.error(gameQuery.errorResponse.errors);
        break;
    }
  }, [gameQuery.status]);

  return (
    <>
      {game && game.status === GameStatus.WAITING && <WaitingRoomContainer game={game} />}
      {game && game.status === GameStatus.IN_PROGRESS && <PlayingContainer game={game} />}
    </>
  );
}
