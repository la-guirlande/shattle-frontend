import { useContext, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Status, useQuery } from "../../hooks/query-hooks"
import { Config } from "../../util/config";
import { GameData } from "../../util/types/data-types";
import { GameResponse } from "../../util/types/response-types"
import { Button } from "../button";
import { AuthenticationContext } from "../contexts/authentication-context";
import { WebsocketContext } from "../contexts/websocket-context";

interface WaitingRoomProps {
    id: string;
}

export const WaitingRoomContainer: React.FC<RouteComponentProps<WaitingRoomProps>> = (props) => {
    const { authUser } = useContext(AuthenticationContext);
    const { socket } = useContext(WebsocketContext);
    const gameQuery = useQuery<GameResponse>();
    const [game, setGame] = useState<GameData>(null);
    const history = useHistory();

    useEffect(() => {
        switch (gameQuery.status) {
            case Status.INIT:
                gameQuery.get(`${Config.API_URL}/games/${props.match.params.id}`);
                break;
            case Status.SUCCESS:
                setGame(gameQuery.response.game);
                console.log(gameQuery.response.game);
                break;
            case Status.ERROR:
                console.error(gameQuery.errorResponse.errors);
                break;
        }
    }, [gameQuery.status]);


    const handleStartGame = () => {
        socket.emit('game.start', { userId: authUser.id, gameId: game.id });
    }

    return (
        <div className='bg-gradient-to-b from-secondary to-primary h-screen pt-10'>
            <div className='font-iceland text-white text-5xl mx-auto flex text-center justify-center w-6/12 pb-5'>
                En attente d'autre joueur
            </div>
            <div className='bg-map w-5/6 h-4/6 mx-auto rounded-2xl' id='map'>
                <div className='font-iceland text-2xl text-white px-10'>Code de la partie</div>
                <> {gameQuery.response?.game ?
                    <div className='border-2 border-white bg-white bg-opacity-25 rounded-lg mx-auto flex justify-center w-6/12'>
                        <div className='font-iceland text-white text-3xl'>{gameQuery.response?.game?.code}</div>
                    </div>
                    :
                    <></>}
                </>
                <div className='px-10'>
                    <div className='font-iceland text-2xl text-white'>Liste des joueurs</div>
                    <ul>
                        {gameQuery.response?.game?.players.map((player, i) => (
                            <li key={i}><div className='font-iceland text-xl text-white'>* {player.name}</div></li>
                        ))}
                    </ul>
                </div>
                <div className='bg-white bg-opacity-25 border-2 border-white rounded-lg mx-auto flex justify-center w-6/12'>
                    <Button className='font-iceland text-3xl text-white' onClick={handleStartGame}>Start game</Button>
                </div>
            </div>
        </div>
    )
}
