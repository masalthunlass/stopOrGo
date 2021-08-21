export class RaceTrackPosition {

    constructor(private _playerColor,
                private _currentPlayerPosition,
                private _previousPlayerPosition) {
    }

    get playerColor() {
        return this._playerColor;
    }

    get currentPlayerPosition() {
        return this._currentPlayerPosition;
    }

    get previousPlayerPosition() {
        return this._previousPlayerPosition;
    }


}
