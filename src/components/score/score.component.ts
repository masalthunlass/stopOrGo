import css from "bundle-text:./score.css";
import {Score} from "../../model/Score.model";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="score">
    </div>
`;

export class ScoreComponent extends HTMLElement {

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
            this.rootNode.innerHTML += `<span class="${score.playerIsCurrent &&  !score.playerIsWinner ? 'show' : 'hide'}">👉</span>
                                        <span class="${score.playerIsWinner ? 'show' : 'hide'}">🏆</span>
                                       <span class="${score.playerColor}">${score.playerName}</span> position : ${score.playerLastScore} `;
        });
    }

    private get rootNode(): HTMLElement {
        return this.shadowRoot.getElementById('score');
    }
}

customElements.define('sog-score', ScoreComponent);
