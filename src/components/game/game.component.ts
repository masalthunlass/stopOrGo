import {Game} from "../../model/Game.model";
import css from "bundle-text:./game.css";
import {Player} from "../../model/Player.model";
import {Score} from "../../model/Score.model";
import {PlayersToScores} from "../../mappers/PlayersToScores";
import {RaceTrackPosition} from "../../model/RaceTrackPosition.model";
import {PlayerToRaceTrackPosition} from "../../mappers/PlayerToRaceTrackPosition";

export {DiceComponent} from "../dice/dice.component";
export {RaceTrackComponent} from "../race-track/race-track.component";
export {ScoreComponent} from "../score/score.component";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="game">
        <sog-dice></sog-dice>
        <sog-score></sog-score>
        <sog-race-track></sog-race-track>
    </div>
`;

export class GameComponent extends HTMLElement {

    private game: Game;

    constructor() {
        super();
        this.attachShadow({mode: "open"})
            .appendChild(
                template.content.cloneNode(true)
            );
        this.game = new Game([new Player('Joueur 1', 'red')], 10);


    }

    get raceTrackComponent() {
        return this.rootNode.getElementsByTagName("sog-race-track").item(0);
    }

    get scoreComponent() {
        return this.rootNode.getElementsByTagName("sog-score").item(0);
    }


    get diceComponent() {
        return this.rootNode.getElementsByTagName("sog-dice").item(0);
    }


    private get rootNode() {
        return this.shadowRoot.getElementById("game");
    }

    connectedCallback() {
        window.addEventListener("load", (e: CustomEvent) => {
            this.raceTrackComponent.setAttribute("length", '' + this.game.maxScore);
            this.scoreComponent.dispatchEvent(new CustomEvent<Score[]>('GAME_START',
                {detail: PlayersToScores.map(this.game.players, this.game.currentPlayer, this.game.maxScore)}));
        });

        this.diceComponent.addEventListener("DICE_VALUE_UPDATED", ({detail: diceValue}: CustomEvent<number>) => {
            this.game.updateScore(diceValue);
            this.scoreComponent.dispatchEvent(new CustomEvent<Score[]>('SCORE_UPDATED',
                {detail: PlayersToScores.map(this.game.players, this.game.currentPlayer, this.game.maxScore)}));
            this.raceTrackComponent.dispatchEvent(new CustomEvent<RaceTrackPosition>('POSITION_CHANGED',
                {detail: PlayerToRaceTrackPosition.map(this.game.currentPlayer)}));
        });
    }

}

customElements.define('sog-game', GameComponent);
