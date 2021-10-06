import {ScorePanelComponent} from "./score-panel.component";
import {PlayerScore} from "../../model/PlayerScore.model";

test('new score panel Component', () => {
    const scoreComponent = new ScorePanelComponent();
    expect(scoreComponent).toBeTruthy();
});

describe('display scores', () => {
    test('add a line of score', () => {
        const scoreComponent = new ScorePanelComponent();
        const scores: PlayerScore[] = [new PlayerScore('toto', 'yellow', 2,  false, false)];

        scoreComponent.displayScore(scores);

        expect(scoreComponent.shadowRoot.getElementById("score").innerHTML).toEqual(
            expect.stringContaining(`<sog-score-player playeriscurrent="false" playeriswinner="false" playercolor="yellow" playerlastscore="2" playername="toto"></sog-score-player>`)
        );
    });

});
