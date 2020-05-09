import React from 'react';
import { useState, useEffect } from 'react';

import styles from './Settings.module.scss';

import { IUser } from '../../interfaces/IUser';
import { Player } from '../../models/Player';
import { Players } from '../../models/Players';

export interface ISettingsProps {
   players: Players;
   minPlayer: number;
   onChangeMinPlayer(event: React.FormEvent<HTMLInputElement>): void;
   onChangeMenu(menu: number): void;
   onChangePlayers(players: Players): void;
}

export function Settings(props: ISettingsProps) {
   
   const [loading, setLoading] = useState(true);
  
   // get Data
   useEffect(() => {
      async function loadContent() {
         const response = await fetch('http://localhost:8080');
         const users: IUser[] = await response.json();

         const players = new Players();

         // add players
         users.forEach((user: IUser) => {
            players.add(new Player(user["user-id"], user["display-name"]))
         })
      
         // add Bots
         const countBots: number = props.minPlayer - users.length;
         if(countBots > 0) {
            for(let i = 0; i < countBots; i++) {
               new Player(user["user-id"], user["display-name"]
            }
         }

         props.onChangePlayers(players);
         setLoading(false);
      }

      if(loading) {
         loadContent();
      }
   }, [loading, props]);


   // Loading Render
   if(loading) {
      return (
         <div>
            LOADING...
         </div>
      )
   }

   // Default Render
   return (
      <div>
         <section className="section">
            <div className="container">
               <div className="field">
                  <label className="label">
                     Mindest Player
                  </label>
                  <div className="control">
                     <input onChange={props.onChangeMinPlayer} className="input" type="number" min="2" step="1" placeholder="10" value={props.minPlayer}/>
                  </div>
               </div>

               <label className="label">
                  Games
               </label>
               <div className="control">
                  <button className="button is-link" type="button" onClick={() => props.onChangeMenu(1)}>Rock Paper Scissors</button>
               </div>
 
    
           
            
            get player: button / or auto update?<br />

            </div>
         </section>

         <section className="section"> 
            <p>Alle Spieler({props.players.length()}):</p>
            <div className={styles.playersContainer}>
               {props.players.render()}
            </div>
         </section>
      </div>
   );
}

export default Settings;