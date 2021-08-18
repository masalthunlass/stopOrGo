import css from "bundle-text:./race-track.css";

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
        const currentElement = this.shadowRoot.getElementById("race-track");
        currentElement.innerHTML = "";
        for (let i = 0; i < size; i++) {
            currentElement.append(document.createElement("sog-square"));
        }
    }


}

customElements.define('sog-race-track', RaceTrackComponent);
