import React from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { CreateGamePage } from '../pages/create-game-page';
import { LoginPage } from '../pages/login-page';
import { JoinGamePage } from '../pages/join-game-page';
import { AuthenticationContextProvider as AuthenticationProvider } from './contexts/authentication-context';
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
          <Route exact path='/game'>
            <GameContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    </WebsocketProvider>
  </AuthenticationProvider>
);

export default App;
