import { GameStates, Conn } from './conn';

const BSPGameStates: GameStates = {
    inMenu: 'Menu',
    inSong: 'Playing',
    paused: 'pause',
    resumed: 'resume',
    mapInfo: 'mapInfo',
}

class BSPConn extends Conn {
    constructor(ip: string, port: string, entry: string) {
        super(ip, port, entry, BSPGameStates);
    }

    parseMessage(message: any): void {
        throw new Error('Method not implemented.');
    }
}

export default BSPConn;