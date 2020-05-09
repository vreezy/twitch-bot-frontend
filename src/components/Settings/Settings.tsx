import React from 'react';
import { useState, useEffect } from 'react';

import { GameService } from '../../services/GameService'

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
               const displayName = `bot${GameService.rollDice(100,999)}`;
               const bot = new Player("000", displayName);
               bot.setIsBot();
               players.add(bot);
            }
         }

         props.onChangePlayers(players);
         setLoading(false);
      }

      if(loading) {
         loadContent();
      }
   }, [loading]);


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
               <label className="label">
                  minimum Player
               </label>
               <div className="field is-grouped">
                  
                  <div className="control">
                     <input onChange={props.onChangeMinPlayer} className="input" type="number" min="2" max="200" step="1" placeholder="10" value={props.minPlayer}/>
                  </div>
                  <div className="control">
                     <button className="button is-link" type="button" onClick={() => setLoading(true)}>Update</button>
                  </div>
 
               </div>

               <label className="label">
                  Games
               </label>
               <div className="control">
                  <button className="button is-link" type="button" onClick={() => props.onChangeMenu(1)}>Rock Paper Scissors</button>
               </div>
            </div>
         </section>

         <section className="section"> 
            <div className="container">
               <p>Alle Spieler({props.players.length()}):</p>
               <div className={styles.playersContainer}>
                  {props.players.render()}
               </div>
            </div>
         </section>
      </div>
   );
}

export default Settings;