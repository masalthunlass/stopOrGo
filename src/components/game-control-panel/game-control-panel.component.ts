import css from "bundle-text:./game-control-panel.css";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="game-control-panel">
       <button id="restart"><icon>🔁</icon> Rejouer</button>
       <button id="stop"><icon>⏹</icon> Stop</button>
    </div>
`;

export class GameControlPanelComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
    }

    private get rootNode() {
        return this.shadowRoot.getElementById("game-control-panel");
    }

    private get restartButton() {
        return this.shadowRoot.getElementById("restart");
    }

    private get stopButton() {
        return this.shadowRoot.getElementById("stop");
    }

    connectedCallback() {
        this.stopButton.addEventListener("click", (e: CustomEvent) => {
            this.dispatchEvent(new CustomEvent('NEXT_PLAYER_CLICKED'));
        });

        this.restartButton.addEventListener("click", (e: CustomEvent) => {
            this.dispatchEvent(new CustomEvent('GAME_RESTART_CLICKED'));
        });
    }
}


customElements.define('sog-game-control-panel', GameControlPanelComponent);
