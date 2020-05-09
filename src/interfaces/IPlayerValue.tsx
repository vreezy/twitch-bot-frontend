import { IUser } from './IUser';

export interface IPlayerValue extends IUser {
    // general
    active: boolean;
    
    // Rock Paper Scissors
    rpsWins: number;

    // from database
    // xp: number;
    

}