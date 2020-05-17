import React from 'react';
import { useState } from 'react';

//import styles from './App.module.scss';
import './app.scss';


import { BattleZone } from '../BattleZone/BattleZone';
import { Settings } from '../Settings/Settings';

// import { IUser } from '../../interfaces/IUser';

// import { Player } from '../../models/Player';
import { Players } from '../../models/Players';

// https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks

function App() {
   const [players, setPlayers] = useState(new Players());
   const [minPlayer, setMinPlayer] = useState(10);
   const [menu, setMenu] = useState(0);

  // const [loading, setLoading] = useState(true);

   // const onChangeMinPlayer = (minPlayer:number ): void => {
   //    // @ts-ignore
   //    setMinPlayer(minPlayer);
   // }

   switch(menu) {
      default:
      case 0:
         return   <Settings
                     players={players}
                     minPlayer={minPlayer}
                     onChangeMinPlayer={(minPlayer) => setMinPlayer(minPlayer)}
                     onChangeMenu={(menu) => setMenu(menu)}
                     onChangePlayers={(players) => setPlayers(players)}
                  />
      case 1:
         return   <BattleZone
                     players={players.clone()}
                  />
   }
}

export default App;