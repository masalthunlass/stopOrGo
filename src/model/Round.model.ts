export class Round {
    private _diceValues = [];
    private _isOver = false;

    constructor() {
    }

    get diceValues() {
        return this._diceValues;
    }

    addDiceValue(diceValue: number) {
        if (diceValue < this.lastDiceValue()) {
            this._isOver = true;
        } else {
            this._diceValues.push(diceValue);
        }
    }

    private lastDiceValue() {
        return this._diceValues[this._diceValues.length - 1];
    }

    startRound() {
        this._diceValues = [];
        this._isOver = false;
    }

    get isOver() {
        return this._isOver;
    }


    endRound() {
        this._isOver = true;
    }
}
