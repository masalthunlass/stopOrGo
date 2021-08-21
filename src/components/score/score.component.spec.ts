import {ScoreComponent} from "./score.component";
import {Score} from "../../model/Score.model";

test('new score Component', () => {
    const scoreComponent = new ScoreComponent();
    expect(scoreComponent).toBeTruthy();
});

describe( 'display scores', () =>  {
    test('add a line with player name in color and score for a player', () => {
        const scoreComponent = new ScoreComponent();
        const scores: Score[] =  [new Score('toto', 'yellow', 2, false, false)];
        scoreComponent.displayScore(scores);
        expect(scoreComponent.shadowRoot.getElementById("score").innerHTML).toEqual(
            expect.stringContaining(`<span class="yellow">toto</span> : 2 pts`)
        );
    });

    test('add a 👉 before current player when no winner yet', () => {
        const scoreComponent = new ScoreComponent();
        const scores: Score[] =  [new Score('toto', 'yellow', 2, true, false)];
        scoreComponent.displayScore(scores);
        expect(scoreComponent.shadowRoot.getElementById("score").innerHTML).toEqual(
            expect.stringContaining(`<span class="show">👉</span>`)
        );
    });

    test('do not add a 👉  before non current player', () => {
        const scoreComponent = new ScoreComponent();
        const scores: Score[] =  [new Score('toto', 'yellow', 2, false, false)];
        scoreComponent.displayScore(scores);
        expect(scoreComponent.shadowRoot.getElementById("score").innerHTML).toEqual(
            expect.stringContaining(`<span class="hide">👉</span>`)
        );
    });

    test('do not add a 👉  before current player when there is a winner yet', () => {
        const scoreComponent = new ScoreComponent();
        const scores: Score[] =  [
            new Score('toto', 'yellow', 2, true, false),
            new Score('titi', 'red', 2, false, true)
        ];
        scoreComponent.displayScore(scores);
        expect(scoreComponent.shadowRoot.getElementById("score").innerHTML).toEqual(
            expect.stringContaining(`<span class="hide">👉</span>`)
        );
    });

    test('add a 🏆 before  player when is winner', () => {
        const scoreComponent = new ScoreComponent();
        const scores: Score[] =  [new Score('toto', 'yellow', 2, true, true)];
        scoreComponent.displayScore(scores);
        expect(scoreComponent.shadowRoot.getElementById("score").innerHTML).toEqual(
            expect.stringContaining(`<span class="show">🏆</span>`)
        );
    });

    test('do not add a 🏆 before  player when is not winner', () => {
        const scoreComponent = new ScoreComponent();
        const scores: Score[] =  [new Score('toto', 'yellow', 2, true, false)];
        scoreComponent.displayScore(scores);
        expect(scoreComponent.shadowRoot.getElementById("score").innerHTML).toEqual(
            expect.stringContaining(`<span class="hide">🏆</span>`)
        );
    });
});
