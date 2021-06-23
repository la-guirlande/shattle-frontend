import { AuthenticationContext } from "../contexts/authentication-context";
import { GameData, GameStatus } from "../../util/types/data-types";
import { useContext } from "react";

export interface ListGamesProps {
    games?: GameData[];
    onSelect(game: GameData): void;
}

export const ListGames: React.FC<ListGamesProps> = (props) => {
    const { authUser } = useContext(AuthenticationContext);

    return (
        <div className="px-8 sm:px-24 lg:px-36 xl:px-56">
            <ul className="flex flex-col p-4">
                {props.games?.map((game, i) => (
                    <li key={i} className=" mb-2" onClick={() => props.onSelect(game)}>
                        <div id='map-game' className="select-none cursor-pointer bg-map rounded-3xl flex flex-1 items-center p-4 shadow-2xl">
                            <div className="flex flex-col border-black border-2 rounded-md w-10 h-10 bg-blue-Dark bg-opacity-75 justify-center items-center mr-4">💧</div>
                            <div className="flex-1 pl-1">
                                <div className="font-iceland text-white text-md">
                                    {game.status === GameStatus.WAITING ?
                                        'Cette partie n\'a pas débuté.'
                                        :
                                        game.currentPlayer?.user?.id === authUser?.id ? `C'est votre tour !` : `C'est le tour de ${game.currentPlayer?.user?.name} !`}
                                </div>
                                {/* TODO: Gérer l'affichage des points de vie. */}
                                <div className="font-iceland text-white text-sm">Pdv restant: {game.status}</div>
                                <div className="font-iceland text-white text-sm">Code: {game.code}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
