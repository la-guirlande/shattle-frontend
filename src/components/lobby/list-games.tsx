import { GameData } from "../../util/types/data-types"

export interface ListGamesProps {
    games?: GameData[];
    launchGame(values: GameData): void;
}

export const ListGames: React.FC<ListGamesProps> = (props) => {

    return (
        <div className="px-8 sm:px-24 lg:px-36 xl:px-56">
            <ul className="flex flex-col p-4">
                {props.games?.map((game) => (
                    <li className=" mb-2" onClick={() => props.launchGame(game)}>
                        <div id='map-game' className="select-none cursor-pointer bg-map rounded-3xl flex flex-1 items-center p-4 shadow-2xl">
                            <div className="flex flex-col border-black border-2 rounded-md w-10 h-10 bg-blue-Dark bg-opacity-75 justify-center items-center mr-4">💧</div>
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-iceland text-white text-xl">Partie du </div>
                                <div className="font-iceland text-white text-sm">Tour de </div>
                            </div>
                            <div className="font-iceland text-white text-md">Tour {game.status}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
