import {Player} from "../model/Player.model";
import {PlayerScore} from "../model/PlayerScore.model";


export class PlayersToScores {

    public static map(players: Player[], currentPlayer: Player, maxScore: number): PlayerScore[] {

        return players.map(player => {
            const isCurrent = player.name === currentPlayer.name;
            const isWinner = player.currentScore == maxScore;
            return new PlayerScore(
                player.name,
                player.color,
                player.currentScore,
                isCurrent,
                isWinner);
        });

    }

}
