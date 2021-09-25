import {ScorePlayerComponent} from "./score-player.component";

test('new score player Component', () => {
    const scorePlayerComponent = new ScorePlayerComponent();
    expect(scorePlayerComponent).toBeTruthy();
});

describe('render', () => {
    test('add a line with player name in color and score for a player', () => {
        const scorePlayerComponent = new ScorePlayerComponent();
        scorePlayerComponent.playerColor = 'yellow';
        scorePlayerComponent.playerName = 'toto';
        scorePlayerComponent.playerLastScore = '2';

        scorePlayerComponent.render();

        expect(scorePlayerComponent.shadowRoot.getElementById("score-player").innerHTML).toEqual(
            expect.stringContaining(`<span class="yellow">toto</span> position : 2`)
        );
    });

    test('add a 👉 before current player when no winner yet', () => {
        const scorePlayerComponent = new ScorePlayerComponent();
        scorePlayerComponent.playerIsCurrent = 'true';
        scorePlayerComponent.playerIsWinner = 'false';

        scorePlayerComponent.render();

        expect(scorePlayerComponent.shadowRoot.getElementById("score-player").innerHTML).toEqual(
            expect.stringContaining(`<span class="show">👉</span>`)
        );
    });

    test('do not add a 👉  before non current player', () => {
        const scorePlayerComponent = new ScorePlayerComponent();
        scorePlayerComponent.playerIsCurrent = 'false';


        scorePlayerComponent.render();

        expect(scorePlayerComponent.shadowRoot.getElementById("score-player").innerHTML).toEqual(
            expect.stringContaining(`<span class="hide">👉</span>`)
        );
    });

    test('do not add a 👉  before current player when he/she is the winner', () => {
        const scorePlayerComponent = new ScorePlayerComponent();
        scorePlayerComponent.playerIsCurrent = 'true';
        scorePlayerComponent.playerIsWinner = 'true';

        scorePlayerComponent.render();

        expect(scorePlayerComponent.shadowRoot.getElementById("score-player").innerHTML).toEqual(
            expect.stringContaining(`<span class="hide">👉</span>`)
        );
    });

    test('add a 🏆 before  player when is winner', () => {
        const scorePlayerComponent = new ScorePlayerComponent();
        scorePlayerComponent.playerIsWinner = 'true';

        scorePlayerComponent.render();

        expect(scorePlayerComponent.shadowRoot.getElementById("score-player").innerHTML).toEqual(
            expect.stringContaining(`<span class="show">🏆</span>`)
        );
    });

    test('do not add a 🏆 before  player when is not winner', () => {
        const scorePlayerComponent = new ScorePlayerComponent();
        scorePlayerComponent.playerIsWinner = 'false';

        scorePlayerComponent.render();

        expect(scorePlayerComponent.shadowRoot.getElementById("score-player").innerHTML).toEqual(
            expect.stringContaining(`<span class="hide">🏆</span>`)
        );
    });
});
