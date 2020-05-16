import React from 'react';

import { ReactSVG } from 'react-svg'
// import { useRef, useEffect,} from 'react';
import player from '../../assets/player3.svg'; 
import char from '../../assets/char.svg'; 

import limb from '../../assets/limb.svg';
import styles from './PlayerView.module.scss'; 

import blank from '../../assets/blank.svg';
import rock from '../../assets/rock.svg';
import paper from '../../assets/paper.svg';
import scissors from '../../assets/scissors.svg';

export enum Weapon {
   blank = 0,
   rock = 1,
   scissors = 2,
   paper = 3
}

export interface IPlayerView {
  displayName: string;
  wins: number;
  xp: number;
  weapon?: Weapon;
  isRight?: boolean;
  jerking?: boolean;
}

export function PlayerView(props: IPlayerView) {

   const getWeapon = () => {
      switch(props.weapon) {
         case Weapon.rock:
            return rock;
         case Weapon.scissors:
            return scissors;
         case Weapon.paper:
            return paper;
         default:
            return blank;
      }
   }

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
                  all[0].textContent = props.displayName.length > 16 ? props.displayName.slice(0,16).trim() + "..." : props.displayName ;
                  // TODO: Calc Level based on xp
                  all[1].textContent = "1"; 
                  all[2].textContent = props.wins.toString();


                  // var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'image');
                  // newElement.setAttribute("x","15"); //Set path's data
                  // newElement.setAttribute("y","10");
                  // newElement.setAttribute("width","60%");
                  // newElement.setAttribute("height","60%");
                  // newElement.setAttribute("href",char);
                  // svg.appendChild(newElement);

                  svg.style.width = "100%";
                  svg.style.height = "100%";
                  
                  // transform: rotateY(360deg)

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
            className={[styles.item, styles.player].join(" ")}
            onClick={() => {
               console.log('wrapper onClick')
            }}
         />

         <ReactSVG
            src={char}
            afterInjection={(error, svg) => {
               if (error) {
                  console.error(error)
                  return
               }
         
               if(svg !== undefined && svg !== null) {
                  svg.style.width = "100%";
                  svg.style.height = "100%";
                  svg.style.transform = props.isRight ? "rotateY(180deg)" : "";

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
            className={[styles.item, styles.char].join(" ")}
            onClick={() => {
               console.log('wrapper onClick')
            }}
         />

         {/* TODO: weapon */}

         {props.weapon && <ReactSVG
            src={getWeapon()}
            afterInjection={(error, svg) => {
               if (error) {
                  console.error(error)
                  return
               }
         
               if(svg !== undefined && svg !== null) {
                  svg.style.width = "100%";
                  svg.style.height = "100%";
                  svg.style.transform = props.isRight ? "rotateY(180deg)" : "";
                  
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
            className={[styles.item, styles.weapon].join(" ")}
            onClick={() => {
               console.log('wrapper onClick')
            }}
         />}




         {props.jerking && <ReactSVG
            src={limb}
            afterInjection={(error, svg) => {
               if (error) {
                  console.error(error)
                  return
               }
         
               if(svg !== undefined && svg !== null) {
                  svg.style.width = "100%";
                  svg.style.height = "100%";
                  svg.style.transform = props.isRight ? "rotateY(180deg)" : "";
                  
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
            className={[styles.item, props.isRight ? styles.limbRight : styles.limb,].join(" ")}
            onClick={() => {
               console.log('wrapper onClick')
            }}
         />}

      </div>
   )
}

export default PlayerView;
