import { WebSocket } from 'ws';

export interface Player {
    id: string;
    gameId: string;
    ws: WebSocket;
}

export interface Game {
    id: string;
    players: Player[];
}
