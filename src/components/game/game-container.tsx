import { FC, useContext, useEffect } from 'react';
import { useGame } from '../../hooks/game-hook';
import { Status, useQuery } from '../../hooks/query-hooks';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { ActionData, GameStatus } from '../../util/types/data-types';
import { GameCreationResponse } from '../../util/types/response-types';
import { AuthenticationContext } from '../contexts/authentication-context';
import { WebsocketContext } from '../contexts/websocket-context';
import BottomNavbar from '../navigation/bottom-navbar';
import { PlayContainer } from './play-container';
import { PlayingContainer } from './playing-container';
import { WaitingRoomContainer } from './waiting-room-container';

export interface GameContainerProps {
  code: string;
}

export const GameContainer: FC<GameContainerProps> = ({ code }) => {
  const { authUser } = useContext(AuthenticationContext);
  const { socket } = useContext(WebsocketContext);
  const createGameQuery = useQuery<GameCreationResponse>();
  const [game, refreshGame] = useGame();

  useEffect(() => {
    if (code) {
      handleJoinGame(code);
    }
  }, []);

  useEffect(() => {
    if (socket != null) {
      socket.on('game.join', ({ gameId, userId }) => {
        refreshGame(gameId);
      });
      socket.on('game.start', ({ gameId }) => {
        refreshGame(gameId);
      });
      socket.on('player.round', ({ gameId, history }) => {
        refreshGame(gameId);
      });
      socket.on('error', console.error);
    }
    return () => {
      socket.off('game.join');
      socket.off('game.start');
      socket.off('player.round');
      socket.off('error');
    }
  }, [socket]);

  useEffect(() => {
    switch (createGameQuery.status) {
      case Status.SUCCESS:
        handleJoinGame(createGameQuery.response.code);
        break;
      case Status.ERROR:
        console.error(createGameQuery.errorResponse.errors);
        break;
    }
  }, [createGameQuery.status]);

  const handleCreateGame = () => {
    createGameQuery.post(`${Config.API_URL}/games`, { player: authUser.id });
  }

  const handleJoinGame = (code: string) => {
    socket.emit('game.join', { code, accessToken: localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) });
  }

  const handleStartGame = () => {
    socket.emit('game.start', { userId: authUser.id, gameId: game.id });
  }

  const handleEndRound = (actions: ActionData[]) => {
    socket.emit('player.round', { userId: authUser.id, gameId: game.id, actions });
  }

  return (
    <>
      {game == null && <PlayContainer onCreate={handleCreateGame} onJoin={handleJoinGame} />}
      {game && game.status === GameStatus.WAITING && <WaitingRoomContainer game={game} onStartGame={handleStartGame} />}
      {game && game.status === GameStatus.IN_PROGRESS && <PlayingContainer game={game} onEndRound={handleEndRound} />}
      <BottomNavbar />
    </>
  );
}
