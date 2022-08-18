import { GameStates, Conn } from './conn';

const DPGameStates: GameStates = {
    inMenu: 'Menu',
    inSong: 'Playing',
    paused: 'pause',
    resumed: 'resume',
    mapInfo: 'mapInfo',
}

class DPConn extends Conn {
    constructor(ip: string, port: string, entry: string) {
        super(ip, port, entry, DPGameStates);
    }

    parseMessage(message: any): void {
        throw new Error('Method not implemented.');
    }

    parseMapInfo(mapInfo: any): void {
        throw new Error('Method not implemented.');
    }
}

export default DPConn;