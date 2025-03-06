import { Game, Player } from '../types';

export class GameDao {
    private games: Map<string, Game>;

    constructor() {
        this.games = new Map();
    }

    createGame(gameId: string): Game {
        const game: Game = { id: gameId, players: [] };
        this.games.set(gameId, game);
        return game;
    }

    getGame(gameId: string): Game | undefined {
        return this.games.get(gameId);
    }

    addPlayerToGame(gameId: string, player: Player): void {
        const game = this.getGame(gameId);
        if (game) {
            game.players.push(player);
        }
    }

    removePlayerFromGame(gameId: string, playerId: string): void {
        const game = this.getGame(gameId);
        if (game) {
            game.players = game.players.filter(p => p.id !== playerId);
            if (game.players.length === 0) {
                this.games.delete(gameId); // Clean up empty games
            }
        }
    }

    getAllGames(): Game[] {
        return Array.from(this.games.values());
    }
}
