import {Dice} from "./dice.component";


test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
});

test('initial dice value is 0', () => {
    const dice = new Dice();
    expect(dice.currentValue).toBe(0);
});
