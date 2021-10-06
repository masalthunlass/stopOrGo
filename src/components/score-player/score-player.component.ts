import css from "bundle-text:./score-player.css";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="score-player">
    </div>
`;

export class ScorePlayerComponent extends HTMLElement {


    constructor() {
        super();

        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );

    }

    static get observedAttributes() {
        return ['playerIsCurrent', 'playerIsWinner', 'playerColor', 'playerName', 'playerLastScore'];
    }

    set playerIsCurrent(val) {
        if (val) {
            this.setAttribute('playerIsCurrent', '' + val);
        } else {
            this.removeAttribute('playerIsCurrent');
        }
    }

    get playerIsCurrent() {
        return this.getAttribute("playerIsCurrent");
    }

    get playerIsWinner() {
        return this.getAttribute("playerIsWinner");
    }


    set playerIsWinner(val) {
        if (val) {
            this.setAttribute('playerIsWinner', '' + val);
        } else {
            this.removeAttribute('playerIsWinner');
        }
    }

    get playerColor() {
        return this.getAttribute("playerColor");
    }


    set playerColor(val) {
        if (val) {
            this.setAttribute('playerColor', '' + val);
        } else {
            this.removeAttribute('playerColor');
        }
    }


    get playerName() {
        return this.getAttribute("playerName");
    }

    set playerName(val) {
        if (val) {
            this.setAttribute('playerName', '' + val);
        } else {
            this.removeAttribute('playerName');
        }
    }


    get playerLastScore() {
        return this.getAttribute("playerLastScore");
    }


    set playerLastScore(val) {
        if (val) {
            this.setAttribute('playerLastScore', '' + val);
        } else {
            this.removeAttribute('playerLastScore');
        }
    }


    render() {
        this.rootNode.innerHTML = `<span class="${(this.playerIsCurrent === 'true' && this.playerIsWinner === 'false') ? 'show' : 'hide'}">👉</span>
                                        <span class="${this.playerIsWinner === 'true' ? 'show' : 'hide'}">🏆</span>
                                        <span class="${this.playerColor}">${this.playerName}</span> 
                                       <span>position : ${this.playerLastScore || 0} </span>`;
    }

    connectedCallback() {

        this.render();
    }


    private get rootNode(): HTMLElement {
        return this.shadowRoot.getElementById('score-player');
    }
}

customElements.define('sog-score-player', ScorePlayerComponent);
