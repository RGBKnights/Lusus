import React from 'react';
import { Client } from 'boardgame.io/react';
import GameTable from './board';
import GameCore from '../game/core';

const ClientApp = Client({
  game: GameCore,
  board: GameTable,
  debug: false,
  multiplayer: false, // { server: 'localhost:8000' }
});

const App = () => (
  <div>
    <div>
      <ClientApp gameID="f5396086" playerID="0" />
    </div>
    <hr />
    <div>
      <ClientApp gameID="f5396086" playerID="1" />
    </div>
    <hr />    
    <div>
      <ClientApp gameID="f5396086" />
    </div>
  </div>
);

export default App;