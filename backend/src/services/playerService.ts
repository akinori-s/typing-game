import { WebSocket } from 'ws';
import { PlayerDao } from '../daos/playerDao';
import { GameDao } from '../daos/gameDao';

export class PlayerService {
    private playerDao: PlayerDao;
    private gameDao: GameDao;

    constructor(playerDao: PlayerDao, gameDao: GameDao) {
        this.playerDao = playerDao;
        this.gameDao = gameDao;
    }

    // Send a message to a specific player
    sendToPlayer(playerId: string, data: any): void {
        const player = this.playerDao.getPlayer(playerId);
        if (player && player.ws.readyState === WebSocket.OPEN) {
            player.ws.send(JSON.stringify(data));
        }
    }

    // Handle incoming text message (just for validation or future logic)
    handleTextMessage(playerId: string, text: string): void {
        const player = this.playerDao.getPlayer(playerId);
        if (!player) return;
        // For now, just pass through; add validation or processing later if needed
    }
}
