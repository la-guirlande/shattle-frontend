import React from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { GamePage } from '../pages/game-page';
import { LobbyPage } from '../pages/lobby-page';
import { LoginPage } from '../pages/login-page';
import { AuthenticationContextProvider as AuthenticationProvider } from './contexts/authentication-context';
import { WebsocketProvider } from './contexts/websocket-context';

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
        </Switch>
      </BrowserRouter>
    </WebsocketProvider>
  </AuthenticationProvider>
);

export default App;
