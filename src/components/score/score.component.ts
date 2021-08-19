import css from "bundle-text:./score.css";
import {Player} from "../../model/Player.model";
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
        this.addEventListener("GAME_START", ({ detail  : score }: (CustomEvent<Score>)) => {
            score.players.forEach((player) => {
                this.rootNode.innerHTML = `<span class="${score.isCurrent(player) ? 'show' : 'hide'}">*</span>
                                            <span class="${player.color}">${player.name}</span> : ${player.score} pts`;
            });

        });
    }

    private get rootNode(): HTMLElement {
        return this.shadowRoot.getElementById('score');
    }
}

customElements.define('sog-score', ScoreComponent);
