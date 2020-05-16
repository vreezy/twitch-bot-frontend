import React from 'react';
import { useState, useEffect } from 'react';

// import styles from './BattleZone.module.scss'; 
import './BattleZone.scss';

import { Player } from '../../models/Player';
// import { Players } from '../../models/Players';

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
   player1HandValue: number;
   player2HandValue: number;
}

export function Phase(props: IPhaseProps) {
   const [phase, setPhase] = useState(0);
   const [phaseTime, setPhaseTime] = useState(4100); // 10sec view for handle fight

   useEffect(() => {
      var phaseTimerID = setInterval(() => phaseTick(), phaseTime );
      return function cleanup() {
         clearInterval(phaseTimerID);
      };
   });

   const phaseTick = () => {
      setPhase(phase + 1);
   }

   // reset phase in next round
   useEffect(() => {
      setPhase(0);
   }, [props.round]);



   const player1View = () => {
      if(phase < 1) {
         return props.player1.renderPlayer1Jerking();
      }
      return props.player1.renderPlayer1();
   }

   const palyer2View = () => {
      if(phase < 1) {
         return props.player2.renderPlayer2Jerking();
      }
      return props.player2.renderPlayer2();
   }

   return (
      <div>
         <section className="section"> 
               <div className="container">
                  <p>Kampfzone (Runde: {props.round})</p>
                  
                  <div className="tile">
                     <div className="tile is-4">
                        <div className="columns is-vcentered is-100">
                           <div className="column is-full has-text-centered">
                              {player1View()}
                           </div>
                        </div>
                     </div>
                     
                     {/* <div className="tile is-2">
                     

                           <img src={getSymbol(player1HandValue)} alt="Symbol" className={styles.image}/>
                           {player1HandValue}<br/>
                           {resultView(player1HandValue, player2HandValue)} 
                     </div>  */}
                     <div className="tile is-4 has-text-centered">
                           <div className="columns is-vcentered is-100">
                              <div className="column is-full has-text-centered">
                                 <MiddleView {...props}/>
                              </div>
                           </div>
   
                     </div>
                     {/* <div className="tile is-2">

                           <img src={getSymbolRight(player2HandValue)} alt="Symbol" className={styles.image}/>
                           {player2HandValue}<br/>
                           {resultView(player2HandValue, player1HandValue)} 
                     </div> */}
                           
                     <div className="tile is-4">
                        <div className="columns is-vcentered is-100">
                           <div className="column is-full has-text-centered">
                              {palyer2View()}
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
   const [phase, setPhase] = useState(0);
   const [phaseTime, setPhaseTime] = useState(1000); 

   useEffect(() => {
      var phaseTimerID = setInterval(() => phaseTick(), phaseTime );
      return function cleanup() {
         clearInterval(phaseTimerID);
      };
   });

   // reset phase in next round
   useEffect(() => {
      setPhase(0);
   }, [props.round]);

   const phaseTick = () => {
      setPhase(phase + 1);
   }
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
   return <span>DRAW or nothing</span>

}