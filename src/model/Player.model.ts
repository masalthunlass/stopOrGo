export class Player {


    constructor(private _name,
                public score= 0,
                public position = 0 ) {
        if (_name === undefined || _name === '') throw  new Error('a player must have a name');
    }

    get name() {
        return this._name;
    }



}
