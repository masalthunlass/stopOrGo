import {Game} from "../../model/Game.model";
import css from "bundle-text:./game.css";
import {Player} from "../../model/Player.model";
import {Score} from "../../model/Score.model";
import {PlayersToScores} from "../../mappers/PlayersToScores";
import {RaceTrackPosition} from "../../model/RaceTrackPosition.model";
import {PlayerToRaceTrackPosition} from "../../mappers/PlayerToRaceTrackPosition";

export {DiceComponent} from "../dice/dice.component";
export {RaceTrackComponent} from "../race-track/race-track.component";
export {ScorePanelComponent} from "../score-panel/score-panel.component";
export {GameControlPanelComponent} from "../game-control-panel/game-control-panel.component";

const template = document.createElement('template');
template.innerHTML = `
    <style>${css}</style>
   <div id="game">
        <sog-dice></sog-dice>
        <br/>
         <sog-game-control-panel></sog-game-control-panel>
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
        this.game = new Game([new Player('Joueur 1', 'red'), new Player('Joueur 2', 'blue')], 30);


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

    get gameControlPanelComponent() {
        return this.rootNode.getElementsByTagName("sog-game-control-panel").item(0);
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
            /*this.game.updateRound(diceValue);
            if (this.game.currentRound.isOver) {
                this.game.updateScore();
                this.game.nextPlayer();
                this.scoreComponent.dispatchEvent(new CustomEvent<Score[]>('SCORE_UPDATED',
                    {detail: PlayersToScores.map(this.game.players, this.game.currentPlayer, this.game.maxScore)}));
                this.raceTrackComponent.dispatchEvent(new CustomEvent<RaceTrackPosition>('POSITION_CHANGED',
                    {detail: PlayerToRaceTrackPosition.map(this.game.currentPlayer)}));
            }*/

        });

        this.gameControlPanelComponent.addEventListener("NEXT_PLAYER_CLICKED", (e: CustomEvent) => {
            /*this.game.currentRound.endRound();
            this.game.updateScore();
            this.game.nextPlayer();*/
        });

        this.gameControlPanelComponent.addEventListener("GAME_RESTART_CLICKED", (e: CustomEvent) => {
            this.game.reset();
            this.scoreComponent.dispatchEvent(new CustomEvent<Score[]>('GAME_START',
                {detail: PlayersToScores.map(this.game.players, this.game.currentPlayer, this.game.maxScore)}
            ));
            this.raceTrackComponent.dispatchEvent(new CustomEvent('GAME_RESTART_CLICKED'));
        });
    }

}

customElements.define('sog-game', GameComponent);
