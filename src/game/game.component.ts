export {Dice} from "../dice/dice.component";
export {RaceTrack} from "../race-track/race-track.component";
import css from "bundle-text:./game.css";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="game">
        <sog-dice></sog-dice>
        <sog-race-track length="10"></sog-race-track>
    </div>
`;

export class GameComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );

    }

}

customElements.define('sog-game', GameComponent);
