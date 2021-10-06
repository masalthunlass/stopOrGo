import {Player} from "./Player.model";

export class Game {

    private _currentPlayerIndex = 0;

    constructor(private _players: Player[], private _maxScore: number) {
        if (_players?.length < 1) throw  new Error('the game needs at least one player to start');
    }


    get maxScore() {
        return this._maxScore;
    }

    get players() {
        return this._players;
    }

    get currentPlayer() {
        return this.players[this._currentPlayerIndex];
    }

    reset(): void {
        this.players.forEach(player => {
            player.resetScore();
        });
        this._currentPlayerIndex = 0;
    }

    nextPlayer(): void {
        if (this._currentPlayerIndex + 1 === this._players.length) {
            this._currentPlayerIndex = 0;
        } else {
            this._currentPlayerIndex++;
        }
    }

    hasWinner() {
        return this.players.findIndex(player => player.currentScore === this.maxScore) !== -1
    }


    updateScore(diceValue: number) {
        let score = this.currentPlayer.currentScore + diceValue
        if (score > this.maxScore) score = this.maxScore;
        this.currentPlayer.scores.push(score);
    }
}
