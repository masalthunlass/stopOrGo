export class Player {


    constructor(private _name,
                private _color,
                public scores = [0]) {
        if (_name === undefined || _name === '') throw  new Error('a player must have a name');
        if (_color === undefined || _color === '') throw  new Error('a player must have a colour');
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }

    get currentScore() {
       return (this.scores.length > 0) ? this.scores[this.scores.length-1]: 0;
    }

    get previousScore() {
        return  (this.scores.length > 1) ? this.scores[this.scores.length-2]: 0;
    }

    resetScore(){
        this.scores = [0];
    }

}
