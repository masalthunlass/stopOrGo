import {Dice} from "./dice.component";



test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
});

test('initial dice value is 0', () => {
    const dice = new Dice();
    expect(dice.currentValue).toBe(0);
});

test('roll the dice change its value', () => {
    const dice = new Dice();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2);
    dice.roll();
    expect(dice.currentValue).toBe(2);
});
