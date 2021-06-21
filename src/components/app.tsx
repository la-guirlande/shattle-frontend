import React from 'react';
import { AuthenticationContextProvider as AuthenticationProvider } from './contexts/authentication-context';
import { BrowserRouter, Route } from 'react-router-dom';
import { GamePage } from '../pages/game-page';
import { LobbyPage } from '../pages/lobby-page';
import { LoginPage } from '../pages/login-page';
import { Switch } from 'react-router';
import { WaitingRoomContainer } from './game/waiting-room-container';
import { WebsocketProvider } from './contexts/websocket-context';
import { GameContainer } from './game/game-container';

const App: React.FC = () => (
  <AuthenticationProvider>
    <WebsocketProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <LoginPage />
          </Route>
          <Route exact path='/lobby'>
            <LobbyPage />
          </Route>
          <Route exact path='/game'>
            <GamePage />
          </Route>
          <Route exact path='/game/:gameId' component={GameContainer} />
        </Switch>
      </BrowserRouter>
    </WebsocketProvider>
  </AuthenticationProvider>
);

export default App;
