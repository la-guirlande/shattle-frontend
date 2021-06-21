import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/authentication-context";
import { Link } from 'react-router-dom';
import { ListGames } from "./list-games";
import { GameData } from "../../util/types/data-types";
import { useEffect } from "react";
import { Status, useQuery } from "../../hooks/query-hooks";
import { GamesResponse } from "../../util/types/response-types";
import { Config } from "../../util/config";
import ReturnButton from "../return-button";

export const LobbyContainer: React.FC = () => {
    const auth = useContext(AuthenticationContext);
    const [games, setGames] = useState<GameData[]>(null);
    const gamesQuery = useQuery<GamesResponse>();

    useEffect(() => {
        if (auth.authUser) {
            switch (gamesQuery.status) {
                case Status.INIT:
                    gamesQuery.get(`${Config.API_URL}/users/${auth.authUser?.id}/games`);
                    break;
                case Status.SUCCESS:
                    setGames(gamesQuery.response?.games);
                    break;
                default: break;
            }
        }
    }, [gamesQuery.status, auth.authUser]);

    const handleLaunchGame = (data: GameData) => {
        //TODO:  A rédiger
    }

    return (
        <div className='bg-gradient-to-b from-secondary to-primary h-screen pt-10'>
            <ReturnButton />
            {/* Top's section */}
            <div className='mt-8 bg-map w-5/6 h-2/6 sm:h-3/6 mx-auto rounded-2xl' id='map'>
                {/* Title */}
                <div className='flex justify-center pt-20 sm:pt-32 lg:pt-40'>
                    <img alt='' className='w-7/12 sm:w-6/12 md:w-3/12 lg:w-4/12' src='/img/shattle.png' />
                </div>

                {/* Play button */}
                <div className='flex justify-center pt-12 lg:pt-24 space-y-0'>
                    <div className='bg-white bg-opacity-50 border-2 border-white rounded-lg'>
                        <Link to='/game'>
                            <img className='w-24 sm:w-32 md:w-36 lg:w-48 p-1' src='/img/jouer.png' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='font-iceland pt-6 px-10 sm:px-20 lg:px-28 text-white text-lg sm:text-2xl lg:text-4xl'>
                Vos parties en cours
            </div>
            <div>
                {games ? <ListGames games={games} launchGame={handleLaunchGame} /> : <></>}
            </div>
        </div>
    )
}
