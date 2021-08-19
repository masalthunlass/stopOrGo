import {Game} from "../../model/Game.model";
import css from "bundle-text:./game.css";
import {Player} from "../../model/Player.model";
import {Score} from "../../model/Score.model";

export {DiceComponent} from "../dice/dice.component";
export {RaceTrackComponent} from "../race-track/race-track.component";
export {ScoreComponent} from "../score/score.component";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="game">
        <sog-dice></sog-dice>
        <sog-score players=""></sog-score>
        <sog-race-track length="10"></sog-race-track>
    </div>
`;

export class GameComponent extends HTMLElement {

    private players: Player[];
    private game: Game;

    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
        this.players = [new Player('Joueur 1', 'red')];
        this.game = new Game(this.players);


    }

    get scoreComponent() {
        return this.shadowRoot.getElementById("game").getElementsByTagName("sog-score").item(0);
    }

    connectedCallback() {
        window.addEventListener("load", (e: CustomEvent<Score>) => {
            this.scoreComponent.dispatchEvent(new CustomEvent('GAME_START',
                {detail:   new Score(this.players, this.game.currentPlayer.name)}));

        });

    }

}

customElements.define('sog-game', GameComponent);
