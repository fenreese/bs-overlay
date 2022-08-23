import { convertMillis } from '../helpers/duration';
import { getBeatSaverInfo } from './BeatSaver';
import { Conn } from './conn';
import { GameStates, MapInformation } from '../models/conn';

const BSPGameStates: GameStates = {
    paused: 'pause',
    resumed: 'resume',
    mapInfo: 'mapInfo',
    stateChange: 'gameState',
    inMenu: 'Menu',
    inSong: 'Playing'
}

class BSPConn extends Conn {
    constructor(ip: string, port: string, entry: string) {
        super(ip, port, entry, BSPGameStates);
    }

    parseMessage(message: any): void {
        if (message._type === 'handshake') {
            console.log(`Beat Saber version ${message.gameVersion}, using BeatSaberPlus song overlay`);
        } else if (message._type === 'event') {
            switch (message._event) {
                case this.gameStates.stateChange: {
                    if (message.gameStateChanged === this.gameStates.inMenu) {
                        console.log('In the menu');
                    } else if (message.gameStateChanged === this.gameStates.inSong) {
                        console.log('In song');
                    }
                    break;
                }
                case this.gameStates.mapInfo: {
                    const currentMap = message.mapInfoChanged;
                    this.parseMapInfo(currentMap);
                    break;
                }
                case this.gameStates.paused: {
                    console.log(`Map paused (at ${message.pauseTime})`);
                    break;
                }
                case this.gameStates.resumed: {
                    console.log(`Map resumed (at ${message.resumeTime})`);
                    break;
                }
            }
        }
    }

    parseMapInfo(mapInfo: any): void {
        mapInfo.level_id = mapInfo.level_id.replace('custom_level_', '');

        // adjust time depending on any time mods
        if (mapInfo.timeMultiplier != 1.0) {
            mapInfo.duration = mapInfo.duration / mapInfo.timeMultiplier;
        }

        // debugging
        console.log(`Song: ${mapInfo.artist} - ${mapInfo.name} ${mapInfo.sub_name != '' ? mapInfo.sub_name : ''}`);
        console.log(`Mapper: ${mapInfo.mapper} | Difficulty: ${mapInfo.difficulty}`);
        console.log(`Length: ${convertMillis(mapInfo.duration)}`);

        let simplifiedMapInfo: MapInformation = {
            title: mapInfo.name,
            subtitle: mapInfo.sub_name,
            artist: mapInfo.artist,
            mapper: mapInfo.mapper,
            image: `data:image/jpg;base64,${mapInfo.coverRaw}`,
            length: mapInfo.duration,
            difficulty: mapInfo.difficulty,
        }

        Promise.resolve(getBeatSaverInfo(mapInfo.level_id, mapInfo.difficulty, mapInfo.characteristic).then(
            (value) => {
                const info = value;
                console.log(info);
                simplifiedMapInfo.beatSaverInfo = info;
            }
        ).finally(
            () => {
                this.updateOverlay(simplifiedMapInfo);
            }
        ));

    }
}

export default BSPConn;