import React from 'react';
import { useState, useEffect } from 'react';

// import { GameService } from '../../services/GameService'
import { RandomService } from '../../services/RandomService'

import styles from './Settings.module.scss';

import { IUser } from '../../interfaces/IUser';
import { Player } from '../../models/Player';
import { Players } from '../../models/Players';

export interface ISettingsProps {
   players: Players;
   minPlayer: number;
   onChangeMinPlayer(minPlayer: number): void;
   onChangeMenu(menu: number): void;
   onChangePlayers(players: Players): void;
}

export function Settings(props: ISettingsProps) {
   const [loading, setLoading] = useState(true);
  
   // get Data
   useEffect(() => {
      console.log("effect called")
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
         const names: string[] = await RandomService.getRandomNames(countBots);
         if(countBots > 0) {
            for(let i = 0; i < countBots; i++) {
               const bot = new Player("00Bot", names[i]);
               bot.setIsBot();
               players.add(bot);
            }
         }

         props.onChangePlayers(players);
         setLoading(false);
         // auto game
         // props.onChangeMenu(1);
      }

      // if(loading || props.minPlayer.toString() !== props.players.length().toString()) {
      if(loading) {
         console.log("componentDIDMount")
         loadContent();
      }
      // @ts-ignore
   }, [loading]);

   const resetUsers = async () => {
      setLoading(true);
      const response = await fetch('http://localhost:8080/reset');
      console.log(await response.json());
      setLoading(false);
   }


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
                     <input onChange={(event: any) => props.onChangeMinPlayer(event.target.value)} className="input" type="number" min="2" max="90" step="1" placeholder="10" value={props.minPlayer}/>
                  </div>
               </div>


               <label className="label">
                  Control
               </label>
               <div className="field is-grouped">
                  <div className="control">
                     <button className="button is-link" type="button" onClick={() => setLoading(true)}>Get User</button>
                  </div>

                  <div className="control">
                     <button className="button is-link" type="button" onClick={resetUsers}>Reset User</button>
                  </div>
 
               </div>

               <label className="label">
                  Games
               </label>
               <div className="field is-grouped">
                  <div className="control">
                     <button className="button is-link" type="button" onClick={() => props.onChangeMenu(1)}>Rock Paper Scissors</button>
                  </div>
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