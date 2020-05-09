import { Composite } from './Composite';
import { Component } from './Component';
import { Player } from './Player';

import { GameService } from '../services/GameService';


export class Players extends Composite {
    protected children: Player[] = [];

    
    constructor(children?: Player[]) {
        super();

        if(children) {
            this.children = children;
        }
    }

    // public render(): React.ReactNode {
    //     return this.children.map((child: Component) => {
    //         return child.render();
    //     })
    // }

    public clone = () => {
        // todo: is Object assing needed?
        return new Players([...this.children])
    }

    public length(): number {
        return this.children.length;
    }

    private getActivePlayers(): Player[] {
        // console.log("children", this.children)
        return this.children.filter((child: Component) => {
            return child.active;
        })
    }

    public getRandomPlayer(): Player | null  {
        if(this.children.length > 0) {
            const selected: number = GameService.rollDice(0, this.children.length - 1)
            return this.children[selected];
        }
        return null;
    }

    public getRandomActivePlayer(lockedPlayers?: Player[]): Player | null {
        let players = this.getActivePlayers();
        // console.log("players", players)
        if(lockedPlayers && lockedPlayers.length > 0) {
            players = players.filter((player: Player) => {
                return lockedPlayers.some((locked: Player) => {
                    return locked.toString() !== player.toString()
                })
            })
        }

        if(players.length > 0) {
            const selected: number = GameService.rollDice(0, players.length - 1)
            return players[selected];
        }
        return null;
    }

    public renderOnlyActive(): React.ReactNode {
        return this.getActivePlayers().map((player: Player) => {
            return player.render()
        });
    }

    public renderWinner(): React.ReactNode {
        let mostWins: number = 0;
        this.children.forEach((player: Player) => {
            mostWins = player.getWins() > mostWins ? player.getWins() : mostWins;
        })

        const winner: Player[] = this.children.filter((player: Player) => {
            return player.getWins() === mostWins
        })

        return winner.map((player: Player) => {
            return player.render()
        })

    }

}

export default Players