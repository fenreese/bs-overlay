interface GameState {
    inMenu: string;
    inSong: string;
    paused: string;
    resumed: string;
    mapInfo?: string;
    scoreChanged?: string;
}

export class Conn {
    private ip: string;
    private port: string;
    private gameState: GameState;
}