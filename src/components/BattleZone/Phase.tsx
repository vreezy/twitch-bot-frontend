import React from 'react';
import { useState, useEffect } from 'react';


import { Player } from '../../models/Player';
// import { Players } from '../../models/Players';

import { GameService } from '../../services/GameService';
import { Weapon } from '../PlayerView/PlayerView';

import styles from './Phase.module.scss';

export interface IPhaseProps {
   player1: Player;
   player2: Player;
   round: number;
}

export function Phase(props: IPhaseProps) {
   const [phase, setPhase] = useState(0);
   const [time, setTime] = useState(2000);

   useEffect(() => {
      var phaseTimerID = setInterval(() => phaseTick(), time);
      return function cleanup() {
         clearInterval(phaseTimerID);
      };
   });

   const phaseTick = () => {
      if(phase === 0) {
         setTime(4000);
      }
      setPhase(phase + 1);
   }

   useEffect(() => {
      setTime(2000);
      setPhase(0);
   }, [props.round]);

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

   const player1HandValue: number = GameService.rollDice(0, 2);
   const player2HandValue: number = GameService.rollDice(0, 2);

   if(phase === 1 && !props.player1.hasWeapon() && !props.player2.hasWeapon()) {
      switch(player1HandValue) {
         case 0:
            props.player1.setWeapon(Weapon.rock);
            break;
         case 1:
            props.player1.setWeapon(Weapon.paper);
            break;
         default:
         case 2:
            props.player1.setWeapon(Weapon.scissors);
            break;
      }

      switch(player2HandValue) {
         case 0:
            props.player2.setWeapon(Weapon.rock);
            break;
         case 1:
            props.player2.setWeapon(Weapon.paper);
            break;
         default:
         case 2:
            props.player2.setWeapon(Weapon.scissors);
            break;
      }

      if(player2HandValue !== player1HandValue) {
         if(result(player2HandValue, player1HandValue)) {
            props.player1.deActivate();
            props.player2.win();
         }
         else {
            props.player1.win()
            props.player2.deActivate();

         }
      }
   }

   const player1View = () => {
      if(phase < 1) {
         return props.player1.renderPlayer1();
      }
      if(phase < 2) {
         return props.player1.renderPlayer1Jerking();
      }
      return props.player1.renderPlayer1Weapon();
   }

   const player2View = () => {
      if(phase < 1) {
         return props.player2.renderPlayer2();
      }
      if(phase < 2) {
         return props.player2.renderPlayer2Jerking();
      }
      return props.player2.renderPlayer2Weapon();
   }

   return (
      <div>
         <section className="section"> 
            <div className="container">
               <p>Stein Papier Schere (Runde: {props.round})</p>
               <div className="tile">

                  <div className="tile is-4">
                     <div className="columns is-vcentered is-100">
                        <div className="column is-full has-text-centered">
                           {player1View()}
                        </div>
                     </div>
                  </div>

                  <div className="tile is-4 has-text-centered">
                     <div className="columns is-vcentered is-100">
                        <div className="column is-full has-text-centered">
                           <MiddleView
                              {...props}
                              player1={props.player1}
                              player2={props.player2}
                              phase={phase}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="tile is-4">
                     <div className="columns is-vcentered is-100">
                        <div className="column is-full has-text-centered">
                           {player2View()}
                        </div>
                     </div>   
                  </div>
            
               </div>
            </div>
         </section>
      </div>

   )
}

export default Phase


function MiddleView(props: any) {
   const [countdown, setCountdown] = useState<number>(5);

   useEffect(() => {
      var countdownTimerID = setInterval(() => countdownTick(), 1000 );
      return function cleanup() {
         clearInterval(countdownTimerID);
      };
   });

   const countdownTick = () => {
      setCountdown(countdown - 1)
   }

   useEffect(() => {
      setCountdown(5);
   }, [props.round]);

   if(countdown > 3) {
      return (
         <span className={styles.fireText}>vs.</span>
      );
   }

   if(countdown > 0) {
      return (
         <span className={styles.middleText}>{countdown.toString()}</span> 
      );
   }

   if(props.phase > 0 && props.player1.hasWeapon() && props.player2.hasWeapon()){
      if(props.player1.isActive() && props.player2.isActive()) {
         return (
            <span className={styles.finalText}>DRAW</span>
         );
      }

      if(props.player1.isActive() && !props.player2.isActive()) {
         return (
            <span className={styles.finalText}>{props.player1.displayName} Wins</span> 
         );
      }

      if(!props.player1.isActive() && props.player2.isActive()) {
         return (
            <span className={styles.finalText}>{props.player2.displayName}  Wins</span> 
         );
      }
   }


   return (
      <span></span> 
   );
}