import React from 'react';
import { useState, useEffect } from 'react';

import styles from './Settings.module.scss';

import { IUser } from '../../interfaces/IUser';
import { Player } from '../../models/Player';
import { Players } from '../../models/Players';

export interface ISettingsProps {
   players: Players;
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

         users.forEach((user: IUser) => {
            players.add(new Player(user["user-id"], user["display-name"]))
         })
      
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
                     Min Player
                  </label>
                  <div className="control">
                     <input className="input" type="number" min="2" step="1" placeholder="10" />
                  </div>
               </div>

               <div className="control">
                  <button className="button is-link">Submit</button>
               </div>

    
            <p>Options:</p>   
            
            
            get player: button / or auto update?<br />
            select game: buttons <br />
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