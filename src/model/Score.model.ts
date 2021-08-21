export class Score {

    constructor(private _playerName,
                private _playerColor,
                private _playerLastScore,
                private _playerIsCurrent) {
    }

    get playerName() {
        return this._playerName;
    }

    get playerColor() {
        return this._playerColor;
    }

    get playerLastScore() {
        return this._playerLastScore;
    }

    get playerIsCurrent() {
        return this._playerIsCurrent;
    }
}
