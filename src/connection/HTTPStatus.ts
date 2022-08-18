import { getBeatSaverInfo } from './BeatSaver';
import { GameStates, Conn } from './conn';
import { convertMillis } from '../helpers/duration';

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
        const status = message.status;
        let currentMap = null;
        if (status.beatmap) {
            currentMap = status.beatmap;
        }

        switch (message.event) {
            case this.gameStates.startup: {
                console.log(`Beat Saber version ${status.game.gameVersion}, HTTP(Sira)Status version ${status.game.pluginVersion}`);

                if (currentMap) {
                    this.parseMapInfo(currentMap);
                }
                break;
            }
            case this.gameStates.inMenu: {
                console.log('In the menu');
                break;
            }
            case this.gameStates.inSong: {
                this.parseMapInfo(currentMap);
                break;
            }
            case this.gameStates.paused: {
                console.log('Map paused');
                break;
            }
            case this.gameStates.resumed: {
                console.log('Map resumed');
                break;
            }
        }
    }

    parseMapInfo(mapInfo: any): void {
        mapInfo.difficulty = mapInfo.difficulty.replace("+", "Plus");

        // debugging
        console.log(`Song: ${mapInfo.songAuthorName} - ${mapInfo.songName} ${mapInfo.songSubName ? mapInfo.songSubName : ''}`);
        console.log(`Mapper: ${mapInfo.levelAuthorName} | Difficulty: ${mapInfo.difficulty}`);
        console.log(`Length: ${convertMillis(mapInfo.length)}`);

        Promise.resolve(getBeatSaverInfo(mapInfo.songHash, mapInfo.difficulty, mapInfo.characteristic).then(
            (value) => {
                const info = value;
                console.log(info);
            }
        ));
    }
}

export default HTTPConn;