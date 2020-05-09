import names from './names.json';
import { GameService } from './GameService';

export class RandomService {

   public static async getRandomNames(count: number): Promise<string[]> {
      try {
         return names;
      }
      catch(e) {
         console.log(e)
         const names: string[] = [];
         for(let i = 0; i < count; i++) {
            names.push(`bot${GameService.rollDice(100,999)}`);
         }
         return names;
      }
   }
   
}
