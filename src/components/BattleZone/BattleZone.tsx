import React from 'react';
import { useState, useEffect } from 'react';

import { Phase } from './Phase';

import styles from './BattleZone.module.scss'; 
import './BattleZone.scss';

import { Player } from '../../models/Player';
import { Players } from '../../models/Players';

import { GameService } from '../../services/GameService';

import { Weapon } from '../PlayerView/PlayerView';

export interface IBattleZoneProps {
   players: Players;
}


export function BattleZone(props: IBattleZoneProps) {
   const [round, setRound] = useState(1);
   const [roundTime, setRoundTime] = useState(10000); // 10sec view for handle fight

   useEffect(() => {
      var roundTimerID = setInterval(() => roundTick(), roundTime );
      return function cleanup() {
         clearInterval(roundTimerID);
      };
   });

   const player1: Player | null = props.players.getRandomActivePlayer();
   const player2: Player | null = player1 !== null ? props.players.getRandomActivePlayer([player1]): null; 

   const player1HandValue: number = GameService.rollDice(0, 2);
   const player2HandValue: number = GameService.rollDice(0, 2);

   const result = (myValue: number, enemyValue: number): boolean => {
      if((myValue - enemyValue) === 1 || (myValue - enemyValue) === -1) {
          if(myValue > enemyValue) {
              return true
          }
          return false
      }

      if(myValue === 0) {
          return true
      }
      return false
   }

   const roundTick = () => {
      setRound(round + 1);
      if(player1 !== null && player2 !== null) {
         if(player1HandValue !== player2HandValue) {
            if(result(player1HandValue, player2HandValue)) {
               player1.win()
               player2.deActivate();
            }
            else {
               player2.win()
               player1.deActivate();
            }
         }
         // props.onChange(players);
         switch(player1HandValue) {
            case 0:
               player1.setWeapon(Weapon.rock);
               break;
            case 1:
               player1.setWeapon(Weapon.paper);
               break;
            default:
            case 2:
               player1.setWeapon(Weapon.scissors);
               break;
         }

         switch(player2HandValue) {
            case 0:
               player2.setWeapon(Weapon.rock);
               break;
            case 1:
               player2.setWeapon(Weapon.paper);
               break;
            default:
            case 2:
               player2.setWeapon(Weapon.scissors);
               break;
         }
      }
      else {
         setRoundTime(100000);
      }
   }


   
//    const getSymbol = (value: number) => {
//       switch(value) {
//           case 0:
//               return rock_left;
//           case 1:
//               return paper_left;
//           default:
//           case 2:
//               return scissors_left;
//       }
//   }


    


   //  const resultView = (myValue: number, enemyValue: number) => {
   //      const myResult = result(myValue, enemyValue);
   //      const enemyResult = result(enemyValue, myValue);

   //      if(myResult && !enemyResult) {
   //          return "Win";
   //      }

   //      if(!myResult && enemyResult) {
   //          return "Lose";
   //      }
   //      return "Draw"
   //  }

   if(player1 !== null && player2 !== null ) {
      return (
         <div>


            <Phase
               player1={player1}
               player2={player2}
               round={round}
               player1HandValue={player1HandValue}
               player2HandValue={player2HandValue}
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