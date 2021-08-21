import {Player} from "./Player.model";

describe('new player ' , () => {
    test('has a name', () => {
        const player = new Player('player 1', 'red');
        expect(player.name).toBe('player 1');
    });

    test('has not an empty name', () => {
        expect(() =>  new Player('', 'red')).toThrow('a player must have a name');
    });

    test('has initially  0 pt', () => {
        const player = new Player('player 1', 'red');
        expect(player.scores[0]).toBe(0);
    });

    test('has a colour', () => {
        const player = new Player('player 1', 'red');
        expect(player.color).toBe('red');
    });

    test('has not an empty color', () => {
        expect(() =>  new Player('player 1', '')).toThrow('a player must have a colour');
    });

});

describe('on updatingScore ' , () => {
    test('score must be dice value if currentScore is 0', () => {
        const player = new Player('player 1', 'red');
        player.scores[0] = 0

        player.updateScore(5);

        expect(player.scores[1]).toBe(5);
    });

    test('score must be currentScore + dice value if currentScore is greater than dice value ', () => {
        const player = new Player('player 1', 'red');
        player.scores[0] = 3

        player.updateScore(5);

        expect(player.scores[1]).toBe(8);
    });

    test('score must be currentScore - dice value if currentScore is lesser than dice value ', () => {
        const player = new Player('player 1', 'red');
        player.scores[0] = 5

        player.updateScore(3);

        expect(player.scores[1]).toBe(2);
    });

    test('score must be currentScore + dice value if currentScore is equal to dice value ', () => {
        const player = new Player('player 1', 'red');
        player.scores[0] = 5

        player.updateScore(5);

        expect(player.scores[1]).toBe(10);
    });

    describe('current score ' , () => {
        test(' is 0 if scores list is empty', () => {
            const player = new Player('player 1', 'red');
            player.scores = []

            expect(   player.currentScore).toBe(0);
        });

        test(' is 2 if scores list last index is 2', () => {
            const player = new Player('player 1', 'red');
            player.scores = [5,2]
            expect(   player.currentScore).toBe(2);
        });
    });

    describe('previous score ' , () => {
        test(' is 0 if scores list is empty', () => {
            const player = new Player('player 1', 'red');
            player.scores = []

            expect(   player.previousScore).toBe(0);
        });

        test(' is 0 if scores list has only one element', () => {
            const player = new Player('player 1', 'red');
            player.scores = [2]

            expect(   player.previousScore).toBe(0);
        });


        test(' is 5 if scores list index before last one is 5', () => {
            const player = new Player('player 1', 'red');
            player.scores = [5,2]
            expect(   player.previousScore).toBe(5);
        });
    });

});
