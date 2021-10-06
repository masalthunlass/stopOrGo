import css from "bundle-text:./score-panel.css";
import {PlayerScore} from "../../model/PlayerScore.model";

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
        this.addEventListener("GAME_START", ({detail: scores}: (CustomEvent<PlayerScore[]>)) => {
            this.displayScore(scores);
        });
        this.addEventListener("SCORE_UPDATED", ({detail: scores}: (CustomEvent<PlayerScore[]>)) => {
            this.displayScore(scores);
        });

    }

    displayScore(scores: PlayerScore[]) {
        this.rootNode.innerHTML = '';
        scores.forEach((scorePlayer) => {
            this.rootNode.innerHTML += `<sog-score-player 
                                        playerIsCurrent="${scorePlayer.isCurrent}" 
                                        playerIsWinner="${scorePlayer.isWinner}" 
                                        playerColor="${scorePlayer.color}" 
                                          playerLastScore="${scorePlayer.lastScore}" 
                                                    playerName="${scorePlayer.name}" 
                                      ></sog-score-player>`;
        });
    }


    private get rootNode(): HTMLElement {
        return this.shadowRoot.getElementById('score');
    }
}

customElements.define('sog-score', ScorePanelComponent);
