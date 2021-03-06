import {Game} from "./Game.model";
import {Player} from "./Player.model";

describe('new game ', () => {

    test('should not have 0 players', () => {
        const players = [];
        expect(() => new Game(players, 1)).toThrow('the game needs at least one player to start');
    });

    test('should start with 1 player', () => {
        const players = [new Player('toto', 'yellow')];
        const game = new Game(players, 1);
        expect(game.players.length).toBe(1);
    });

    test('has a first player', () => {
        let firstPlayer = new Player('toto', 'yellow');
        let secondPlayer = new Player('titi', 'red');
        const players = [firstPlayer, secondPlayer];
        const game = new Game(players, 1);
        expect(game.currentPlayer).toBe(firstPlayer);
    });

    test('has a max score', () => {
        let firstPlayer = new Player('toto', 'yellow');
        const players = [firstPlayer];
        const game = new Game(players, 10);
        expect(game.maxScore).toBe(10);
    });
});

describe('next player ', () => {

    test('should give the following one in players lits', () => {
        let firstPlayer = new Player('toto', 'yellow');
        let secondPlayer = new Player('titi', 'red');
        const players = [firstPlayer, secondPlayer];

        const game = new Game(players, 10);
        game.nextPlayer();

        expect(game.currentPlayer).toBe(secondPlayer);
    });

    test('should give the first one in players lits when no following one', () => {
        let firstPlayer = new Player('toto', 'yellow');
        let secondPlayer = new Player('titi', 'red');
        const players = [firstPlayer, secondPlayer];

        const game = new Game(players, 10);
        game.nextPlayer();
        game.nextPlayer();

        expect(game.currentPlayer).toBe(firstPlayer);
    });


});


describe('hasWinner ', () => {
    test('should be true when a player reaches max score ', () => {
        const game = new Game([new Player('player 1', 'red')], 5);
        game.currentPlayer.scores = [5];

        game.hasWinner();

        expect(game.hasWinner()).toBe(true);
    });

    test('should be false when no player had reached max score ', () => {
        const game = new Game([new Player('player 1', 'red'), new Player('player 2', 'yellow')], 15);
        game.players[0].scores = [5];
        game.players[1].scores = [6];

        game.hasWinner();

        expect(game.hasWinner()).toBe(false);
    });
});

describe('when reset game', () => {
    test('scores should be empty for each player ', () => {
        const game = new Game([new Player('player 1', 'red'), new Player('player 2', 'yellow')], 10);
        game.players[0].scores = [5];
        game.players[1].scores = [6];

        game.reset();

        expect(game.players[0].scores).toEqual([0]);
        expect(game.players[1].scores).toEqual([0]);

    });

    test('current player should be first one ', () => {
        let firstPlayer = new Player('player 1', 'red');
        let secondPlayer = new Player('player 2', 'yellow');
        const game = new Game([firstPlayer, secondPlayer], 10);
        game.nextPlayer();
        expect(game.currentPlayer).toEqual(secondPlayer);

        game.reset();

        expect(game.currentPlayer).toEqual(firstPlayer);

    });


});


describe('on updatingCurrentPlayerScore - several players ', () => {
    let playerOne;
    let playerSecond;
    beforeEach(() => {
        playerOne = new Player('player 1', 'red');
        playerSecond = new Player('player 2', 'yellow');
    })

    test('score should be dice value when lastPosition is 0 and there is only one roll in the round ', () => {

        playerOne.scores[0] = 0
        const game = new Game([playerOne, playerSecond], 10);

        game.updateScore(5);

        expect(game.currentPlayer.currentScore).toBe(5);
    });

    test('score should be dice value + last position when  there is only one roll in the round ', () => {

        playerOne.scores[0] = 3
        const game = new Game([playerOne, playerSecond], 10);

        game.updateScore(5);

        expect(game.currentPlayer.currentScore).toBe(8);
    });


    test('score must not be over max score ', () => {

        playerOne.scores[0] = 5
        const game = new Game([playerOne, playerSecond], 10);

        game.updateScore(5);

        expect(game.currentPlayer.currentScore).toBe(10);
    });


});


