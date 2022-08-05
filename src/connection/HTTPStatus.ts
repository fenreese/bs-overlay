import { GameStates, Conn } from './conn';

const HTTPGameStates: GameStates = {
    inMenu: 'menu',
    inSong: 'songStart',
    paused: 'pause',
    resumed: 'resume',
    startup: 'hello',
}

class HTTPConn extends Conn {
    constructor(ip: string, port: string, entry: string) {
        super(ip, port, entry, HTTPGameStates);
    }

    parseMessage(message: any): void {
        throw new Error('Method not implemented.');
    }
}

export default HTTPConn;