import React from 'react';

import { ReactSVG } from 'react-svg'
// import { useRef, useEffect,} from 'react';
import player from '../../assets/player3.svg'; 
import char from '../../assets/char.svg'; 
 
import styles from './PlayerView.module.scss'; 

export interface IPlayerView {
  displayName: string;
  wins: number;
  xp: number;
}

export function PlayerView(props: IPlayerView) {
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
                  // TODO: Calc Level based on xp
                  all[1].textContent = "1"; 
                  all[2].textContent = props.wins.toString();


                  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'image');
                  newElement.setAttribute("x","15"); //Set path's data
                  newElement.setAttribute("y","15");
                  newElement.setAttribute("width","60%");
                  newElement.setAttribute("height","60%");
                  newElement.setAttribute("href",char);
                  newElement.setAttribute("transform","translate(200,0) scale(-1, 1) translate(-100, -100) scale(2, 2) scale(1, 1) rotate(45, 100, 100)");


                  // transform="scale(-2,2)"
                  svg.appendChild(newElement);

                  svg.style.width = "100%";
                  svg.style.height = "100%";

               }
               // console.log(svg)
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
         {/* <ReactSVG
            src={char}
            afterInjection={(error, svg) => {
               if (error) {
                  console.error(error)
                  return
               }
         
               // if(svg !== undefined && svg !== null) {
               //    // @ts-ignore
               //    svg.querySelector("tspan").textContent = props.displayName;

               //    const all = svg.querySelectorAll("tspan");
               //    all[0].textContent = props.displayName;
               //    // TODO: Calc Level based on xp
               //    all[1].textContent = "1"; 
               //    all[2].textContent = props.wins.toString();

               //    svg.style.width = "100%";
               //    svg.style.height = "100%";
               // }
               // console.log(svg)
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
         /> */}
         </div>
      </div>
   )
}

export default PlayerView;