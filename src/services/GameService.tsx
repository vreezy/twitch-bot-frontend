export class GameService {

   public static rollDice(min: number, max: number) {
      return min + Math.floor(Math.random() * (max-min + 1))
   }

   // https://stackoverflow.com/a/12646864
   public static durstenfeldShuffle(array: any[]): void {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
   
   }
}
