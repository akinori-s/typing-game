import { Player } from '../types';

export class PlayerDao {
    private players: Map<string, Player>;

    constructor() {
        this.players = new Map();
    }

    addPlayer(player: Player): void {
        this.players.set(player.id, player);
    }

    getPlayer(playerId: string): Player | undefined {
        return this.players.get(playerId);
    }

    removePlayer(playerId: string): void {
        this.players.delete(playerId);
    }

    getPlayersInGame(gameId: string): Player[] {
        return Array.from(this.players.values()).filter(p => p.gameId === gameId);
    }
}
