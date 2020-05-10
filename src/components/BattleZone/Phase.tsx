import React from 'react';
import { useState, useEffect } from 'react';

import styles from './BattleZone.module.scss'; 
import './BattleZone.scss';

import { Player } from '../../models/Player';
import { Players } from '../../models/Players';

import { GameService } from '../../services/GameService';

import rock_left from '../../assets/rock_left.jpg'
import rock_right from '../../assets/rock_right.jpg'

import paper_left from '../../assets/paper_left.jpg'
import paper_right from '../../assets/paper_right.jpg'

import scissors_left from '../../assets/scissors_left.jpg'
import scissors_right from '../../assets/scissors_right.jpg'

export interface IPhaseProps {
   player1: Player;
   player2: Player;
   round: number;
}

export function Phase(props: IPhaseProps) {
   const [phase, setPhase] = useState(0);
   const [phaseTime, setPhaseTime] = useState(1000); // 10sec view for handle fight

   useEffect(() => {
      var phaseTimerID = setInterval(() => phaseTick(), phaseTime );
      return function cleanup() {
         clearInterval(phaseTimerID);
      };
   });

   const phaseTick = () => {
      setPhase(phase + 1);
   }

   const middleView = () => {
      if(phase < 1) {
         return <span>VS.</span>
      }
      if(phase < 2) {
         return <span>3</span>
      }
      if(phase < 3) {
         return <span>2</span>
      }
      if(phase < 4) {
         return <span>1</span>
      }
      // if draw return draw
   }

   return (
      <div>
         <section className="section"> 
               <div className="container">
                  <p>Kampfzone</p>
                  
                  <div className="tile">
                     <div className="tile is-2">
                           {props.player1.render()}
                     </div>
                     
                     <div className="tile is-2">
                     

                           {/* <img src={getSymbol(player1HandValue)} alt="Symbol" className={styles.image}/> */}
                           {/* {player1HandValue}<br/> */}
                           {/* {resultView(player1HandValue, player2HandValue)}  */}
                     </div>
                     <div className="tile is-4 has-text-centered">
                           <div className="columns is-vcentered is-100">
                              <div className="column is-full has-text-centered">
                                 {middleView()}<br/>
                                 Round {props.round}<br />
                                
                              </div>
                           </div>
   
                     </div>
                     <div className="tile is-2">

                           {/* <img src={getSymbolRight(player2HandValue)} alt="Symbol" className={styles.image}/> */}
                           {/* {player2HandValue}<br/> */}
                           {/* {resultView(player2HandValue, player1HandValue)}  */}
                     </div>
                           
                     <div className="tile is-2">
                           {props.player2.render()}    
                     </div>
               
                  </div>
               </div>
         </section>
      </div>

   )
}

export default Phase