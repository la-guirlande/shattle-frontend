import { FC } from 'react';
import { GameData } from "../../util/types/data-types";
import { Button } from "../button";

export interface WaitingRoomContainerProps {
    game: GameData;
    onStartGame?: () => void;
}

export const WaitingRoomContainer: FC<WaitingRoomContainerProps> = ({ game, onStartGame }) => {
    return (
        <div className='bg-gradient-to-b from-secondary to-primary h-screen pt-10'>
            <div className='font-iceland text-white text-5xl mx-auto flex text-center justify-center w-6/12 pb-5'>
                En attente d'autre joueur
            </div>
            <div className='bg-map w-5/6 h-4/6 mx-auto rounded-2xl' id='map'>
                <div className='font-iceland text-2xl text-white px-10'>Code de la partie</div>
                <div className='border-2 border-white bg-white bg-opacity-25 rounded-lg mx-auto flex justify-center w-6/12'>
                    <div className='font-iceland text-white text-3xl'>{game.code}</div>
                </div>
                <div className='px-10'>
                    <div className='font-iceland text-2xl text-white'>Liste des joueurs</div>
                    <ul>
                        {game.players.map((player, i) => (
                            <li key={i}><div className='font-iceland text-xl text-white'>* {player.name}</div></li>
                        ))}
                    </ul>
                </div>
                <div className='bg-white bg-opacity-25 border-2 border-white rounded-lg mx-auto flex justify-center w-6/12'>
                    <Button className='font-iceland text-3xl text-white' onClick={onStartGame}>Start game</Button>
                </div>
            </div>
        </div>
    )
}
