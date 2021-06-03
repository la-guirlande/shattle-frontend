import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hooks';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { GameData } from '../../util/types/data-types';
import { GameResponse } from '../../util/types/response-types';
import { AuthenticationContext } from '../contexts/authentication-context';
import { WebsocketContext } from '../contexts/websocket-context';
import { GameCanvas } from './game-canvas';

export const GameContainer: FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const { socket } = useContext(WebsocketContext);
  const gameQuery = useQuery<GameResponse>();
  const [game, setGame] = useState<GameData>(null);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (socket != null) {
      socket.on('game.join', ({ gameId }) => {
        gameQuery.get(`${Config.API_URL}/games/${gameId}`);
      });
      socket.on('game.start', console.log);
      socket.on('error', console.error);
      return () => {
        socket.off('game.join');
        socket.off('game.start');
        socket.off('error');
      }
    }
  }, [socket]);

  useEffect(() => {
    switch (gameQuery.status) {
      case Status.SUCCESS:
        setGame(gameQuery.response.game);
        console.log(gameQuery.response.game);
        break;
      case Status.ERROR:
        console.error(gameQuery.errorResponse.errors);
        break;
    }
  }, [gameQuery.status]);

  const handleJoinGame = () => {
    socket.emit('game.join', { code: inputRef.current.value, accessToken: localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) });
  }

  const handleStartGame = () => {
    socket.emit('game.start', { userId: authUser.id, gameId: game.id });
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Game code" />
      <button onClick={handleJoinGame}>Join game</button>
      <button onClick={handleStartGame}>Start game</button>
      {game != null && <GameCanvas map={game?.map} width={game?.map?.config?.width * game?.map?.config?.tilewidth} height={game?.map?.config?.height * game?.map?.config?.tileheight} />}
    </div>
  );
}
