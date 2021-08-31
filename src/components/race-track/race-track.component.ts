import css from "bundle-text:./race-track.css";
import {RaceTrackPosition} from "../../model/RaceTrackPosition.model";

export {SquareComponent} from "../square/square.component";

const template = document.createElement('template');

template.innerHTML = `
   <style>${css}</style>
   <div id="race-track">
    </div>
`;

export class RaceTrackComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(template.content.cloneNode(true));
    }

    get length() {
        return +this.getAttribute("length") || 1;
    }

    set length(val) {
        if (val) {
            this.setAttribute('length', '' + val);
        } else {
            this.removeAttribute('length');
        }
    }

    static get observedAttributes() {
        return ['length'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'length':
                this.createTrackOfSize(newValue);
                break;
        }
    }

    private createTrackOfSize(size: number = 1) {
        const currentElement = this.rootNode;
        currentElement.innerHTML = "";
        for (let i = 1; i <= size; i++) {
            let square = document.createElement("sog-square");
            currentElement.append(square);
        }
    }


    private get rootNode() {
        return this.shadowRoot.getElementById("race-track");
    }

    connectedCallback() {
        this.addEventListener("POSITION_CHANGED", ({detail: raceTrackPosition}: CustomEvent<RaceTrackPosition>) => {
            this.updateCurrentPlayerPosition(raceTrackPosition);
        });

        this.addEventListener("GAME_RESTART_CLICKED", (e: CustomEvent) => {
            this.resetTrack();
        });

    }

    resetTrack() {
        let squares = this.rootNode.getElementsByTagName("sog-square");
        for (let i = 0;i < squares.length;  i++) {
            if (squares.item(i).hasAttribute("color")) {
                squares.item(i).removeAttribute("color");
            }
        }
    }

    updateCurrentPlayerPosition(raceTrackPosition) {
        let squares = this.rootNode.getElementsByTagName("sog-square");
        if (squares.item(raceTrackPosition.previousPlayerPosition).hasAttribute("color")) {
            squares.item(raceTrackPosition.previousPlayerPosition).removeAttribute("color");
        }
        squares.item(raceTrackPosition.currentPlayerPosition).setAttribute("color", raceTrackPosition.playerColor);
    }
}

customElements.define('sog-race-track', RaceTrackComponent);
