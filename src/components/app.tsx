import React from 'react';
import { AuthenticationContextProvider as AuthenticationProvider } from './contexts/authentication-context';
import { BrowserRouter, Route } from 'react-router-dom';
import { GameContainer } from './game/game-container';
import { LobbyPage } from '../pages/lobby-page';
import { Switch } from 'react-router';
import { WebsocketProvider } from './contexts/websocket-context';

const App: React.FC = () => (
  <AuthenticationProvider>
    <WebsocketProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {/* <AuthenticationPage /> */}
          </Route>
          <Route exact path='/lobby'>
            <LobbyPage />
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
