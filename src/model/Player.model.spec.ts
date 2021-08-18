import {Player} from "./Player.model";

describe('new player ' , () => {
    test('has a name', () => {
        const player = new Player('player 1');
        expect(player.name).toBe('player 1');
    });

    test('has not an empty name', () => {
        expect(() =>  new Player('')).toThrow('a player must have a name');
    });

    test('has initially  0 pt', () => {
        const player = new Player('player 1');
        expect(player.score).toBe(0);
    });

    test('is initially at position 0 in the race', () => {
        const player = new Player('player 1');
        expect(player.position).toBe(0);
    });


})
