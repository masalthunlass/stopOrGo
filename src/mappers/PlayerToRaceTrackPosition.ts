import {Player} from "../model/Player.model";
import {RaceTrackPosition} from "../model/RaceTrackPosition.model";


export class PlayerToRaceTrackPosition {

    public static map(player: Player): RaceTrackPosition {
        const previousPlayerPosition = player.previousScore == 0 ? 0 :  player.previousScore  - 1;
        const playerPosition = player.currentScore == 0 ? 0 :  player.currentScore  - 1;
        return new RaceTrackPosition(player.color, playerPosition, previousPlayerPosition );
    }

}
