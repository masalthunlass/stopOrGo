export class PlayerScore {

    constructor(private _name,
                private _color,
                private _lastScore,
                private _isCurrent,
                private _isWinner) {
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }

    get lastScore() {
        return this._lastScore;
    }

    get isCurrent() {
        return this._isCurrent;
    }

    get isWinner() {
        return this._isWinner;
    }
}
