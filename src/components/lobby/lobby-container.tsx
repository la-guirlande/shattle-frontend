import React, { useContext, useEffect, useState } from "react";
import ReturnButton from "../navigation/return-button";
import { AuthenticationContext } from "../contexts/authentication-context";
import { Config } from "../../util/config";
import { ListGames } from "./list-games";
import { GameData, GameStatus } from "../../util/types/data-types";
import { Status, useQuery } from "../../hooks/query-hooks";
import { GamesResponse } from "../../util/types/response-types";
import { useHistory } from "react-router-dom";

export const LobbyContainer: React.FC = () => {
    const { authUser } = useContext(AuthenticationContext);
    const [games, setGames] = useState<GameData[]>(null);
    const gamesQuery = useQuery<GamesResponse>();
    const history = useHistory();

    useEffect(() => {
        if (authUser) {
            switch (gamesQuery.status) {
                case Status.INIT:
                    gamesQuery.get(`${Config.API_URL}/users/${authUser.id}/games`);
                    break;
                case Status.SUCCESS:
                    setGames(gamesQuery.response?.games);
                    break;
                default: break;
            }
        }
    }, [gamesQuery.status, authUser]);

    const handlePlayGame = () => {
        history.push('/game');
    }

    const handleLaunchGame = (game: GameData) => {
        history.push({
            pathname: '/game',
            search: `?id=${game.id}`
        });
    }

    const compareStatus = (a: GameData, b: GameData) => {
        if (parseInt(a.status.toString()) > parseInt(b.status.toString()) && compareCurrentUser(a, b)) {
            return 1;
        } else {
            return -1;
        }
    }

    const compareCurrentUser = (a: GameData, b: GameData) => {
        if (a.currentPlayer.user.id === authUser.id) {
            return 1;
        } else if (b.currentPlayer.user.id === authUser.id) {
            return -1;
        }
        return 0;
    }

    return (
        <div className='bg-gradient-to-b from-secondary to-primary h-full pt-10'>
            <ReturnButton />
            {/* Top's section */}
            <div className='bg-map w-5/6 h-2/6 sm:h-3/6 mx-auto rounded-2xl' id='map'>
                {/* Title */}
                <div className='flex justify-center pt-20 sm:pt-32 lg:pt-40'>
                    <img alt='' className='w-7/12 sm:w-6/12 md:w-3/12 lg:w-4/12' src='/img/shattle.png' />
                </div>

                {/* Play button */}
                <div className='flex justify-center pt-12 lg:pt-24 space-y-0' >
                    <div className='bg-white bg-opacity-50 border-2 border-white rounded-lg' onClick={handlePlayGame}>
                        <img className='w-24 sm:w-32 md:w-36 lg:w-48 p-1' src='/img/jouer.png' />
                    </div>
                </div>
            </div>
            <div className='font-iceland pt-6 px-10 sm:px-20 lg:px-28 text-white text-lg sm:text-2xl lg:text-4xl'>
                Vos parties en cours
            </div>
            <div>
                {games ?
                    <ListGames games={games
                        .filter(game => game.status === GameStatus.IN_PROGRESS || game.status === GameStatus.WAITING)
                        .sort((a, b) => compareStatus(a, b))
                        .sort((a, b) => compareCurrentUser(a, b))
                    }
                        onSelect={handleLaunchGame} />
                    : <></>}
            </div>
        </div>
    )
}
