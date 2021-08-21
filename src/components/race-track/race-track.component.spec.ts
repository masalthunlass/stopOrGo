import {RaceTrackComponent} from "./race-track.component";
import {RaceTrackPosition} from "../../model/RaceTrackPosition.model";

test('new race track of 1 square long', () => {
    const raceTrack = new RaceTrackComponent();
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
    const raceTrack = new RaceTrackComponent();
    raceTrack.length = size;
    return raceTrack;
}

const getSquareElementsCreated = (raceTrack: RaceTrackComponent) => {
    return raceTrack.shadowRoot.getElementById("race-track").getElementsByTagName("sog-square");
}


describe('update current player position', () => {

    test('put player color on player position ', () => {
        const raceTrack = givenRackOfSize(2);
        let playerPosition = new RaceTrackPosition('red', 1, 0);
        raceTrack.updateCurrentPlayerPosition(playerPosition);
        expect(raceTrack.shadowRoot.innerHTML)
            .toEqual(
            expect.stringContaining(`<div id="race-track"><sog-square></sog-square><sog-square color="red"></sog-square></div>`)
        );
    });

    test('remove color on previous player position ', () => {
        const raceTrack = givenRackOfSize(2);
        raceTrack.shadowRoot.innerHTML = `<div id="race-track"><sog-square></sog-square><sog-square color="red"></sog-square></div>`;

        raceTrack.updateCurrentPlayerPosition(new RaceTrackPosition('red', 0, 1));

        expect(raceTrack.shadowRoot.innerHTML)
            .toEqual(
                expect.stringContaining(`<div id="race-track"><sog-square color="red"></sog-square><sog-square></sog-square></div>`)
            );
    });

});


