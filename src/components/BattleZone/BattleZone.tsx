import React from 'react';
import { useState, useEffect } from 'react';

import { Phase } from './Phase';

import styles from './BattleZone.module.scss'; 
import './BattleZone.scss';

import { Player } from '../../models/Player';
import { Players } from '../../models/Players';

//bimport { GameService } from '../../services/GameService';
import { Weapon } from '../PlayerView/PlayerView';

// import { Weapon } from '../PlayerView/PlayerView';

export interface IBattleZoneProps {
   players: Players;
}


export function BattleZone(props: IBattleZoneProps) {
   const [round, setRound] = useState(1);


   useEffect(() => {
      const interval = setInterval(() => {
         setRound(round => round + 1);
      }, 10000);
      return () => clearInterval(interval);
   }, []);

   const player1: Player | null = props.players.getRandomActivePlayer();
   const player2: Player | null = player1 !== null ? props.players.getRandomActivePlayer([player1]): null; 

   player1?.setWeapon(Weapon.blank);
   player2?.setWeapon(Weapon.blank);


   if(player1 !== null && player2 !== null ) {
      // props.players.remove(player1)
      // props.players.remove(player2)
      return (
         <div>

            <Phase
               player1={player1}
               player2={player2}
               round={round}
            />

            <section className="section"> 
               <div className="container">
                  
                     <p>Aktive Spieler ({props.players.activePlayerLength()})</p>
                  
               
                  <div className={styles.playersContainer}>
                        {props.players.renderOnlyActive()}
                  </div>

               </div>
            </section>
         </div>
      );
   }

    return (
        <div>
            <section className="section">
               <div className="container">
                  Gewinner

                  <div className={styles.playersContainer}>
                
                     {props.players.renderWinner()}
                  </div>
               </div>
            </section>
        </div>
    )
}

export default BattleZone;