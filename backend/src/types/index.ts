import { WebSocket } from 'ws';
export interface IUser {
  id: string; // UUID as string
  name: string;
  email: string;
  password: string;
}

export interface Player {
    id: string;
    gameId: string;
    ws: WebSocket;
}

export interface Game {
    id: string;
    players: Player[];
}
