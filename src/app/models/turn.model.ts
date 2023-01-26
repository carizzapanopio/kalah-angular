import { Player } from '@app/models/player.model';
import { Game } from '@app/models/game.model';
import { House } from '@app/models/house.model';

export interface Turn {
    id: number;
    game: Game;
    houseValues: House[];
    zoneValue: number;
    player: Player;
}
