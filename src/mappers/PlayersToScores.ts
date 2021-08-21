import {Score} from "../model/Score.model";
import {Player} from "../model/Player.model";


export class PlayersToScores {

    public static map(players: Player[], currentPlayer: Player, maxScore: number): Score[] {
        return players.map(player => new Score(player.name, player.color,
            player.currentScore, player.name === currentPlayer.name, player.currentScore == maxScore));
    }

}
