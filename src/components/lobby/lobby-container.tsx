import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/authentication-context";
import { Link } from 'react-router-dom';
import { ListGames } from "./list-games";
import { GameData } from "../../util/types/data-types";
import { useEffect } from "react";
import { Status, useQuery } from "../../hooks/query-hooks";
import { GamesResponse } from "../../util/types/response-types";
import { Config } from "../../util/config";

export const LobbyContainer: React.FC = () => {
    const auth = useContext(AuthenticationContext);
    const [games, setGames] = useState<GameData[]>(null);
    const gamesQuery = useQuery<GamesResponse>();

    useEffect(() => {
        console.log(auth.authUser?.name);
        switch (gamesQuery.status) {
            case Status.INIT:
                gamesQuery.get(`${Config}/users/${auth.authUser?.id}/games`);
                // console.log('INIT')
                break;
            case Status.SUCCESS:
                setGames(gamesQuery.response?.games);
                // console.log('SUCCESS ' + gamesQuery.response?.games);
                break;
            default: break;
        }
    }, [gamesQuery.status]);

    const handleLaunchGame = (data: GameData) => {
        //TODO:  A rédiger
    }

    return (
        <div className='bg-gradient-to-b from-secondary to-primary h-screen pt-10'>
            {/* Top's section */}
            <div className='bg-map w-5/6 h-3/6 mx-auto rounded-2xl' id='map'>
                {/* Title */}
                <div className='flex justify-center pt-28 lg:pt-52'>
                    <img alt='' className='w-8/12' src='/img/shattle.png' />
                </div>

                {/* Play button */}
                <div className='flex justify-center pt-12 lg:pt-24 space-y-0'>
                    <div className='bg-white bg-opacity-50 border-2 border-white rounded-lg'>
                        <Link to='/game'>
                            <img className='w-36 lg:w-72 p-1' src='/img/jouer.png' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='pt-4 px-10 lg:px-20 font-iceland text-white text-md lg:text-4xl'>
                Vos parties en cours
            </div>
            <div>
                {games ? <ListGames games={games} launchGame={handleLaunchGame} /> : <></>}
            </div>
        </div>
    )
}
