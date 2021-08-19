import {Game} from "./Game.model";
import {Player} from "./Player.model";

describe('new game ', () => {

    test('should not have 0 players', () => {
        const players = [];
        expect(() => new Game(players)).toThrow('the game needs at least one player to start');
    });

    test('should start with 1 player', () => {
        const players = [new Player('toto', 'yellow')];
        const game = new Game(players);
        expect(game.players.length).toBe(1);
    });

    test('has a first player', () => {
        let firstPlayer = new Player('toto', 'yellow');
        let secondPlayer = new Player('titi', 'red');
        const players = [firstPlayer, secondPlayer];
        const game = new Game(players);
        expect(game.currentPlayer).toBe(firstPlayer);
    });
});

describe('next player ', () => {

    test('should give the following one in players lits', () => {
        let firstPlayer = new Player('toto', 'yellow');
        let secondPlayer = new Player('titi', 'red');
        const players = [firstPlayer, secondPlayer];

        const game = new Game(players);
        game.nextPlayer();

        expect(game.currentPlayer).toBe(secondPlayer);
    });

    test('should give the first one in players lits when no following one', () => {
        let firstPlayer = new Player('toto', 'yellow');
        let secondPlayer = new Player('titi', 'red');
        const players = [firstPlayer, secondPlayer];

        const game = new Game(players);
        game.nextPlayer();
        game.nextPlayer();

        expect(game.currentPlayer).toBe(firstPlayer);
    });
});



