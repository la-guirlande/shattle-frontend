import React, { useContext } from "react";
import { AuthenticationContext } from "../contexts/authentication-context";
import { Link } from 'react-router-dom';

export const LobbyContainer: React.FC = () => {

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

            <div className='divide-y-4 divide-gray-400 divide-opacity-50 pt-4 px-10 lg:px-20'>
                <div className='font-iceland text-white text-md lg:text-4xl w-auto'>
                    Vos parties en cours
                </div>
                {/* List of the user's current games */}
                {
                    <div></div>
                }
            </div>
        </div>
    )
}
