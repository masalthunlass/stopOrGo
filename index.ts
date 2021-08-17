export {Dice} from "./src/dice/dice.component";
export {RaceTrack} from "./src/race-track/race-track.component";
import css from "bundle-text:./global.css";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="app">
        <h2>Stop Or Go ?</h2>
        <sog-dice></sog-dice>
        <sog-race-track length="10"></sog-race-track>
    </div>
`;

export class Index extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
    }
}

customElements.define('sog-app', Index);
