
export class Dice {
    private _currentValue: number = 0;

    constructor() {
    }

    get currentValue() {
        return this._currentValue;
    }

    roll(): void {
        this._currentValue = Math.floor( Math.random() * 6) + 1;
    }
}
