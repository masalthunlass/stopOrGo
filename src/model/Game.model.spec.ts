import {Game} from "./Game.model";
import {Player} from "./Player.model";

describe('new game ' , () => {

        test('should not have 0 players', () => {
            const players = [];
            expect(() => new Game(players)).toThrow('the game needs at least one player to start');
        });

        test('should start with 1 player', () => {
            const players = [new Player('toto')];
            const game = new Game(players);
            expect(game.players.length).toBe(1);
        });
})


