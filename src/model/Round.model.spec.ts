import {Round} from "./Round.model";

describe('new round  ', () => {
    test('starts with an empty dice values list', () => {
        const round = new Round();
        expect(round.diceValues.length).toBe(0);
    });
});

describe('addDiceValue  ', () => {
    test('should keep dice value when first one', () => {
        const round = new Round();

        round.addDiceValue(2);

        expect(round.diceValues.length).toBe(1);
        expect(round.diceValues[0]).toBe(2);
    });

    test('should push dice value at the end when not first one when new value is higher than previous value', () => {
        const round = new Round();
        round['_diceValues'] = [2];

        round.addDiceValue(3);

        expect(round.diceValues.length).toBe(2);
        expect(round.diceValues[0]).toBe(2);
        expect(round.diceValues[1]).toBe(3);
    });

    test('should push dice value at the end when not first one when new value is equal to previous value', () => {
        const round = new Round();
        round['_diceValues'] = [2];

        round.addDiceValue(2);

        expect(round.diceValues.length).toBe(2);
        expect(round.diceValues[0]).toBe(2);
        expect(round.diceValues[1]).toBe(2);
    });

    test('should not push dice value at the end when not first one when new value is lesser than previous value', () => {
        const round = new Round();
        round['_diceValues'] = [3];

        round.addDiceValue(2);

        expect(round.diceValues.length).toBe(1);
        expect(round.diceValues[0]).toBe(3);

    });
});

describe('startRound ', () => {
    test('should empty dice values list', () => {
        const round = new Round();
        round['_diceValues'] = [2, 3];

        round.startRound();

        expect(round.diceValues.length).toBe(0);
    });

    test('should make round is over false', () => {
        const round = new Round();
        round.endRound();

        round.startRound();

        expect(round.isOver).toBeFalsy();
    });

});

describe('round is over ', () => {
    test('should be false at start', () => {
        const round = new Round();

        expect(round.isOver).toBeFalsy();
    });

    test('should be false when only one dice roll in the round', () => {
        const round = new Round();
        round.addDiceValue(3);
        expect(round.isOver).toBeFalsy();
    });

    test('should be false when new dice value is higher than previous dice value in the round', () => {
        const round = new Round();
        round.addDiceValue(3);
        round.addDiceValue(4);
        expect(round.isOver).toBeFalsy();
    });


    test('should be false when new dice value is equal to than previous dice value in the round', () => {
        const round = new Round();
        round.addDiceValue(3);
        round.addDiceValue(3);
        expect(round.isOver).toBeFalsy();
    });

    test('should be true when new dice value is lesser than previous dice value in the round', () => {
        const round = new Round();
        round.addDiceValue(4);
        round.addDiceValue(3);
        expect(round.isOver).toBeTruthy();
    });

});


describe('end round ', () => {
    test('should make round over', () => {
        const round = new Round();
        round.endRound();
        expect(round.isOver).toBeTruthy();
    });
});
