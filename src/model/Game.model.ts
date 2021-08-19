import {Player} from "./Player.model";

export class Game {

    private _currentPlayerIndex = 0;

    constructor(private _players: Player[]) {
        if (_players?.length < 1) throw  new Error('the game needs at least one player to start');
    }

    get players() {
        return this._players;
    }

    get currentPlayer() {
        return this.players[this._currentPlayerIndex];
    }

    nextPlayer(): void {
       if(this._currentPlayerIndex + 1 === this._players.length)  {
           this._currentPlayerIndex = 0;
       } else {
           this._currentPlayerIndex++;
       }
    }
}
