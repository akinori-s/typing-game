import { Server as WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { GameService } from '../services/gameService';

export function setupWebSocket(server: Server) {
    const wss = new WebSocketServer({ server });
    const gameService = new GameService();

    wss.on('connection', (ws: WebSocket) => {
        let playerId: string | null = null;

        ws.on('message', (message: string) => {
            try {
                const data = JSON.parse(message);

                if (data.type === 'join' && data.gameId) {
                    playerId = gameService.handlePlayerConnect(ws, data.gameId);
                    console.log(`Player ${playerId} joined game ${data.gameId}`);
                } else if (playerId) {
                    gameService.handleMessage(playerId, data, ws, wss);
                }
            } catch (error) {
                console.error('Invalid message:', error);
            }
        });

        ws.on('close', () => {
            if (playerId) {
                gameService.handlePlayerDisconnect(playerId, ws, wss);
                console.log(`Player ${playerId} disconnected`);
            }
        });
    });
}
