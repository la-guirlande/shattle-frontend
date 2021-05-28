import React from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { CreateGamePage } from '../pages/create-game-page';
import { HomePage } from '../pages/home-page';
import { JoinGamePage } from '../pages/join-game-page';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/createGame'>
        <CreateGamePage />
      </Route>
      <Route exact path='/joinGame'>
        <JoinGamePage />
      </Route>
      <Route exact path='/settings'>
        <JoinGamePage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
