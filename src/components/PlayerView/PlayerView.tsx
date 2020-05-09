import React from 'react';
import ReactDOM from 'react-dom';
import { ReactSVG } from 'react-svg'
import { useRef, useEffect, MutableRefObject} from 'react';
import player from '../../assets/player3.svg'; 
import { ReactComponent as Player } from '../../assets/player3.svg'; 
import { v4 as uuidv4 } from 'uuid';

import styles from './PlayerView.module.scss'; 
// https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks


export interface IPlayerView {
  displayName: string;
  wins: number;
}


export function PlayerView(props: IPlayerView) {
    // const playerSVG = useRef<SVGElement | null>();
    // return (
    //   <div className={styles.player}>
    //     {props.displayName}<br />
    //     {props.wins}<br />
    //     {/* {props.player.rpsWins}<br />
    //     {props.player.active ? "active": "inactve"} */}
    //     {/* {JSON.stringify(props.player.username)} */}
    //   </div>
    // );

    const pid = "playerimage" + uuidv4();


    return (
      <div className={styles.container}>
      <ReactSVG
        src={player}
        afterInjection={(error, svg) => {
          if (error) {
            console.error(error)
            return
          }
          
          if(svg !== undefined && svg !== null) {
            // @ts-ignore
            svg.querySelector("tspan").textContent = props.displayName;

            const all = svg.querySelectorAll("tspan");
            all[0].textContent = props.displayName;
            all[1].textContent = "1";
            all[2].textContent = props.wins.toString();

            
          }
          console.log(svg)
        }}
        // beforeInjection={svg => {
        //   svg.classList.add('svg-class-name')
        //   svg.setAttribute('style', 'width: 200px')
        // }}
        evalScripts="always"
        fallback={() => <span>Error!</span>}
        loading={() => <span>Loading</span>}
        renumerateIRIElements={false}
        wrapper="span"
        className={styles.player}
        onClick={() => {
          console.log('wrapper onClick')
        }}
      />
        
     
   <div className={styles.char}>
       &nbsp;
   </div>
  </div>
    )



}

export default PlayerView;
