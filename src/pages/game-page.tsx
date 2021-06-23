import { RouteComponentProps } from 'react-router-dom';
import { GameContainer } from '../components/game/game-container';

export const GamePage: React.FC<RouteComponentProps> = ({ location }) => (
    <GameContainer id={new URLSearchParams(location.search).get('id')} />
)
