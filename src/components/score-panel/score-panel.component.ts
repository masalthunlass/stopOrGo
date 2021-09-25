import {Score} from "../../model/Score.model";
import css from "bundle-text:./score-panel.css";
export {ScorePlayerComponent} from "../score-player/score-player.component";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="score-panel">
   <span>Le pointeur indique le joueur courant</span>
   <div id="score">
    </div>
    </div>
`;

export class ScorePanelComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
    }

    connectedCallback() {
        this.addEventListener("GAME_START", ({detail: scores}: (CustomEvent<Score[]>)) => {
            this.displayScore(scores);
        });
        this.addEventListener("SCORE_UPDATED", ({detail: scores}: (CustomEvent<Score[]>)) => {
            this.displayScore(scores);
        });
    }

    displayScore(scores: Score[]) {
        this.rootNode.innerHTML = '';
        scores.forEach((score) => {
            this.rootNode.innerHTML += `<sog-score-player 
                                        playerIsCurrent="${score.playerIsCurrent}" 
                                        playerIsWinner="${score.playerIsWinner}" 
                                        playerColor="${score.playerColor}" 
                                          playerLastScore="${score.playerLastScore}" 
                                                    playerName="${score.playerName}" 
                  
                                      ></sog-score-player>`;
        });
    }


    private get rootNode(): HTMLElement {
        return this.shadowRoot.getElementById('score');
    }
}

customElements.define('sog-score', ScorePanelComponent);
