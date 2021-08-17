import {RaceTrack} from "./race-track.component";

test('new race track of 1 square long', () => {
    const raceTrack = new RaceTrack();
    expect(raceTrack.length).toBe(1);
});

test('new race track of 10 square long', () => {
    const raceTrack = givenRackOfSize(10);
    let rackSquares = getSquareElementsCreated(raceTrack);
    expect(rackSquares.length).toBe(10);
});

test('new race track of 5 square long with previous one of 10 ', () => {
    const raceTrack = givenRackOfSize(10);
    let rackSquares = getSquareElementsCreated(raceTrack);
    expect(rackSquares.length).toBe(10);

    raceTrack.length = 5;
    rackSquares = getSquareElementsCreated(raceTrack);
    expect(rackSquares.length).toBe(5);
});

const givenRackOfSize =  (size: number) => {
    const raceTrack = new RaceTrack();
    raceTrack.length = size;
    return raceTrack;
}

const getSquareElementsCreated = (raceTrack: RaceTrack) => {
    return raceTrack.shadowRoot.getElementById("race-track").getElementsByTagName("sog-square");
}


