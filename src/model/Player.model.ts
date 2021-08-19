export class Player {


    constructor(private _name,
                private _color,
                public score = 0,
                public position = 0 ) {
        if (_name === undefined || _name === '') throw  new Error('a player must have a name');
        if (_color === undefined || _color === '') throw  new Error('a player must have a colour');
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }



}
