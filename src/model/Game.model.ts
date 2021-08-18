import {Player} from "./Player.model";

export class Game {

    constructor(private _players: Player[]) {
        if (_players?.length < 1) throw  new Error('the game needs at least one player to start');
    }

    get players() {
        return this._players;
    }

    start(): void {

    }
}
