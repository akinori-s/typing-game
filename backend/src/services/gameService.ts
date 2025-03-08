import { WebSocketServer, WebSocket } from 'ws';
import { GameDao } from '../daos/gameDao';
import { PlayerDao } from '../daos/playerDao';
import { PlayerService } from './playerService';
import { Player } from '../types';

export class GameService {
    private gameDao: GameDao;
    private playerDao: PlayerDao;
    private playerService: PlayerService;

    constructor() {
        this.gameDao = new GameDao();
        this.playerDao = new PlayerDao();
        this.playerService = new PlayerService(this.playerDao, this.gameDao);
    }

    handlePlayerConnect(ws: WebSocket, gameId: string): string {
        const playerId = this.generatePlayerId();
        const player: Player = { id: playerId, gameId, ws };

        if (!this.gameDao.getGame(gameId)) {
            this.gameDao.createGame(gameId);
        }

        this.playerDao.addPlayer(player);
        this.gameDao.addPlayerToGame(gameId, player);

        // Send confirmation to the new player
        this.playerService.sendToPlayer(playerId, {
            type: 'init',
            playerId,
            gameId,
            message: `Connected to game ${gameId}`
        });

        // Notify others in the game
        this.broadcastToGame(gameId, {
            type: 'playerJoined',
            playerId,
            message: `Player ${playerId} joined the game`
        }, ws);

        return playerId;
    }

    handleMessage(playerId: string, data: any, ws: WebSocket, wss: WebSocketServer) {
        const player = this.playerDao.getPlayer(playerId);
        if (!player) return;

        if (data.type === 'text') {
            const text = data.message;
            this.playerService.handleTextMessage(playerId, text);

            // Broadcast the text to other players in the game
            this.broadcastToGame(player.gameId, {
                type: 'message',
                playerId,
                message: text
            }, ws);
        }
    }

    handlePlayerDisconnect(playerId: string, ws: WebSocket, wss: WebSocketServer) {
        const player = this.playerDao.getPlayer(playerId);
        if (!player) return;

        this.playerDao.removePlayer(playerId);
        this.gameDao.removePlayerFromGame(player.gameId, playerId);

        this.broadcastToGame(player.gameId, {
            type: 'playerLeft',
            playerId,
            message: `Player ${playerId} left the game`
        }, ws);
    }

    private broadcastToGame(gameId: string, data: any, sender: WebSocket) {
        const players = this.playerDao.getPlayersInGame(gameId);
        players.forEach(player => {
            if (player.ws !== sender && player.ws.readyState === WebSocket.OPEN) {
                player.ws.send(JSON.stringify(data));
            }
        });
    }

    private generatePlayerId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
}
