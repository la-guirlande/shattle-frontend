import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Status, useQuery } from '../../hooks/query-hooks';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { GameData } from '../../util/types/data-types';
import { GameResponse } from '../../util/types/response-types';
import { Button } from '../button';
import { AuthenticationContext } from '../contexts/authentication-context';
import { WebsocketContext } from '../contexts/websocket-context';

export const GameContainer: FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const { socket } = useContext(WebsocketContext);
  const gameQuery = useQuery<GameResponse>();
  const [game, setGame] = useState<GameData>(null);
  const inputRef = useRef<HTMLInputElement>();
  const history = useHistory();

  useEffect(() => {
    if (socket != null) {
      socket.on('game.join', ({ gameId }) => {
        gameQuery.get(`${Config.API_URL}/games/${gameId}`);
        history.push(`/game/${gameId}`);
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
        break;
      case Status.ERROR:
        console.error(gameQuery.errorResponse.errors);
        break;
    }
  }, [gameQuery.status]);

  const handleJoinGame = () => {
    socket.emit('game.join', { code: inputRef.current.value, accessToken: localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) });
  }

  const handleCreateGame = () => {
    if (authUser) {
      const body = {
        player: authUser.id,
      }
      gameQuery.post(`${Config.API_URL}/games`, body);
    }
  }

  return (
    <div className='bg-gradient-to-b from-secondary to-primary h-screen pt-10'>
      <div className='bg-map w-5/6 h-5/6 sm:h-3/6 mx-auto rounded-2xl' id='map'>
        <div className='bg-white bg-opacity-25 border-2 border-white rounded-lg mx-auto flex justify-center w-6/12'>
          <Button className="font-iceland text-3xl text-white" onClick={handleCreateGame}>
            Créer une partie
          </Button>
        </div>
        <div>
          <div className='mx-auto flex justify-center w-6/12 pb-5'>
            <input className='border-2 border-primary rounded-lg' ref={inputRef} type="text" placeholder="Game code" />
          </div>
          <div className='bg-white bg-opacity-25 border-2 border-white rounded-lg mx-auto flex justify-center w-6/12 '>
            <Button className='font-iceland text-3xl text-white' onClick={handleJoinGame}>Rejoindre une partie</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
