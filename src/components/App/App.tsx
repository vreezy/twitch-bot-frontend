import React from 'react';
import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import './app.scss';
// import { PlayerList } from '../PlayerList/PlayerList';

import { BattleZone } from '../BattleZone/BattleZone';

import { IUser } from '../../interfaces/IUser';

import { Player } from '../../models/Player'     // Component
import { Players } from '../../models/Players'   // Composite

// https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks

function App() {
  
  const [players, setPlayers] = useState(new Players());

  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    async function loadContent() {
      const response = await fetch('http://localhost:8080');
      const users: IUser[] = await response.json();

      const players = new Players();

      users.forEach((user: IUser) => {
        players.add(new Player(user["user-id"], user["display-name"]))
      })
      
      setPlayers(players);
      setLoading(false);
    }
    if(loading) {
      loadContent();
    }
  }, [loading]);

  if(loading) {
    return (
      <div>
        LOADING...
      </div>
    )
  }


  return (

    <div>
 
      <section className="section"> 
        
            <h1 className="title">
              Rock Paper Scissors
            </h1>

            <div className={styles.playersContainer}>
              {players.render()}
            </div>

        
      </section>

              



      <BattleZone players={players} onChange={(players) => setPlayers(players)}/>
     

    </div>

  );
}

export default App;

