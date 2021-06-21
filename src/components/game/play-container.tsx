import { FC, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Status, useQuery } from '../../hooks/query-hooks';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { GameCreationResponse } from '../../util/types/response-types';
import { Button } from '../button';
import { AuthenticationContext } from '../contexts/authentication-context';
import { WebsocketContext } from '../contexts/websocket-context';

export const PlayContainer: FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const { socket } = useContext(WebsocketContext);
  const createGameQuery = useQuery<GameCreationResponse>();
  const inputRef = useRef<HTMLInputElement>();
  const history = useHistory();

  useEffect(() => {
    if (socket != null) {
      socket.on('game.join', ({ gameId }) => {
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
  }, []);

  useEffect(() => {
    switch (createGameQuery.status) {
      case Status.SUCCESS:
        handleJoinGame(createGameQuery.response.code);
        break;
      case Status.ERROR:
        console.error(createGameQuery.errorResponse.errors);
        break;
    }
  });

  const handleCreateGame = () => {
    if (authUser) {
      createGameQuery.post(`${Config.API_URL}/games`, { player: authUser.id });
    }
  }

  const handleJoinGame = (code: string) => {
    socket.emit('game.join', { code, accessToken: localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) });
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
            <Button className='font-iceland text-3xl text-white' onClick={() => handleJoinGame(inputRef.current.value)}>Rejoindre une partie</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
