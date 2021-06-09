import React, { useContext } from "react";
import { AuthenticationContext } from "../contexts/authentication-context";
import { Link } from 'react-router-dom';

export const LobbyContainer: React.FC = () => {
    const { authUser } = useContext(AuthenticationContext);

    return (
        <div className='bg-gradient-to-b from-secondary to-primary h-screen'>
            {/* Top's section */}
            <div className='bg-map w-5/6 h-3/6 mx-auto rounded-2xl' id='map'>
                {/* Title */}
                <div className='flex justify-center pt-20'>
                    <img alt='' className='w-8/12' src='/img/shattle.png' />
                </div>

                {/* Play button */}
                <div className='flex justify-center pt-16 md'>
                    <div className='bg-white bg-opacity-50 border-2 border-white rounded-lg'>
                        <Link to='/game'>
                            <img className='w-36 lg:w-72 p-1' src='/img/jouer.png' />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='font-iceland w-auto text-md lg:text-3xl'>Vos parties en cours</div>
            {/* <p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p>
            <p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p>
            <p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p><p className='font-iceland w-auto bg-primary text-md lg:text-lg'>Vos parties en cours</p> */}

            {/* List of ongoing games */}
        </div>
    )
}
