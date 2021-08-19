import {Player} from "./Player.model";

export class Score {


    constructor(public readonly players: Player[],
                private current: string) {
    }

    isCurrent(player: Player): boolean {
        return this.current === player.name;
    }

}
