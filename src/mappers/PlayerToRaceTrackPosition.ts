import {Player} from "../model/Player.model";
import {RaceTrackPosition} from "../model/RaceTrackPosition.model";


export class PlayerToRaceTrackPosition {

    public static map(currentPlayer: Player): RaceTrackPosition {
        const previousPlayerPosition = currentPlayer.previousScore == 0 ? 0 : currentPlayer.previousScore - 1;
        const nextPlayerPosition = currentPlayer.currentScore == 0 ? 0 : currentPlayer.currentScore - 1;
        return new RaceTrackPosition(currentPlayer.color, nextPlayerPosition, previousPlayerPosition);
    }

}
