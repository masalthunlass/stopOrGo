import {Player} from "./Player.model";
import {Round} from "./Round.model";

export class Game {

    private _currentPlayerIndex = 0;
    private _currentRound = new Round();

    constructor(private _players: Player[], private _maxScore: number) {
        if (_players?.length < 1) throw  new Error('the game needs at least one player to start');
    }

    get currentRound() {
        return this._currentRound;
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
        this._currentRound.startRound();
    }

    nextPlayer(): void {
        this.currentRound.startRound();
        if (this._currentPlayerIndex + 1 === this._players.length) {
            this._currentPlayerIndex = 0;
        } else {
            this._currentPlayerIndex++;
        }
    }

    hasWinner() {
        return this.players.findIndex(player => player.currentScore === this.maxScore) !== -1
    }


    updateRound(diceValue: number) {
        if (!this.currentRound.isOver) {
            this.currentRound.addDiceValue(diceValue);
        }
    }


    updateScore() {
        if (this.currentRound.isOver) {
            let score = this.currentPlayer.currentScore + this.currentRound.diceValues.reduce((sum, diceValue) => sum + diceValue, 0);
            if (score > this.maxScore) score = this.maxScore;
            this.currentPlayer.scores.push(score);
        }
    }
}
