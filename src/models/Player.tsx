import React from 'react';
import { v4 as uuid } from "uuid";
// import { GameObject } from './GameObject';

import Component from './Component';
import { PlayerView, Weapon } from '../components/PlayerView/PlayerView';

export class Player extends Component {
   constructor(userId: string, displayName: string) {
      super();

      this.userId = userId;
      this.displayName = displayName;
      this.active = true;
      this.wins = 0;
      this.isBot = false;
      this.weapon = Weapon.blank
   }

   public readonly userId: string;
   public readonly displayName: string; // ReactNode
   private isBot: boolean;
   private weapon: Weapon;

   private wins: number;

   public setIsBot(): void {
      this.isBot = true;
   }
   
   public win(): void {
      this.wins += 1;
   }

   public getWins(): number {
      return this.wins;
   }

   public deActivate(): void {
      this.active = false;
   }

   public setWeapon(weapon: Weapon) {
      console.log(weapon);
      this.weapon = weapon;
   }


   public render(): React.ReactNode {
      return (
         <PlayerView
               key={uuid()}
               displayName={this.displayName}
               wins={this.wins}
               xp={0}
         />
      );
   }

   public renderPlayer1(): React.ReactNode {
      return (
         <PlayerView
               key={uuid()}
               displayName={this.displayName}
               wins={this.wins}
               xp={0}
               isRight={true}
         />
      );
   }


   public renderPlayer2(): React.ReactNode {
      return (
         <PlayerView
               key={uuid()}
               displayName={this.displayName}
               wins={this.wins}
               xp={0}
         />
      );
   }

   public renderPlayer1Jerking(): React.ReactNode {
      return (
         <PlayerView
               key={uuid()}
               displayName={this.displayName}
               wins={this.wins}
               xp={0}
               isRight={true}
               jerking={true}
         />
      );
   }

   public renderPlayer2Jerking(): React.ReactNode {
      return (
         <PlayerView
               key={uuid()}
               displayName={this.displayName}
               wins={this.wins}
               xp={0}
               jerking={true}
         />
      );
   }

   public renderPlayer1Weapon(): React.ReactNode {
      return (
         <PlayerView
               key={uuid()}
               displayName={this.displayName}
               wins={this.wins}
               xp={0}
               isRight={true}
               weapon={this.weapon}
         />
      );
   }

   public renderPlayer2Weapon(): React.ReactNode {
      return (
         <PlayerView
               key={uuid()}
               displayName={this.displayName}
               wins={this.wins}
               xp={0}
               weapon={this.weapon}
         />
      );
   }
}