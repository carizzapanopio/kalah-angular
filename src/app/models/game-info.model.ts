import { Game } from "./game.model";
import { Player } from "./player.model";
export interface GameInfo {
    id: string;
    game: Game
    playerOne: Player,
    playerTwo: Player,
    winner: Player,
}
