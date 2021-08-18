import {Game} from "../../model/Game.model";
import css from "bundle-text:./game.css";
import {Player} from "../../model/Player.model";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="game">
        <sog-dice></sog-dice>
        <sog-race-track length="10"></sog-race-track>
    </div>
`;

export class GameComponent extends HTMLElement {

    private game: Game = new Game([new Player('Joueur 1')]);

    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
    }

}

customElements.define('sog-game', GameComponent);
