import { ConstantBackoff, WebsocketBuilder } from 'websocket-ts';
import { updateShadowElementImage, updateShadowElementText } from '../helpers/html';
import { GameStates, MapInformation } from '../models/conn';

export abstract class Conn {
    protected gameStates: GameStates;
    protected isConnected: boolean = false;
    protected route: any;

    constructor(ip: string, port: string, entry: string, gameStates: GameStates) {
        this.gameStates = gameStates;
        this.route = `ws://${ip}:${port}/${entry}`;

        this.initWebSocket(this.route);
    }

    private initWebSocket(route: string) {
        console.log(`Connecting to websocket on ${route}...`);

        new WebsocketBuilder(route)
            .onOpen(() => {
                console.log('Connected to websocket!');
                this.isConnected = true;
            })
            .onClose(() => {
                console.log(`Connection to ${route} failed, retrying in 5 seconds...`);
            })
            .onMessage((_, message) => {
                const msg = JSON.parse(message.data);
                this.parseMessage(msg);
            })
            .withBackoff(new ConstantBackoff(5000))
            .build();
    }

    abstract parseMessage(message: any): void;
    abstract parseMapInfo(mapInfo: any): void;

    public updateOverlay(mapInfo: MapInformation) {
        console.log(mapInfo.beatSaverInfo);

        updateShadowElementText('song-overlay', '.title', mapInfo.title);
        updateShadowElementText('song-overlay', '.subtitle', mapInfo.subtitle ? mapInfo.subtitle : '');
        updateShadowElementText('song-overlay', '.artist', mapInfo.artist ? mapInfo.artist : '');
        updateShadowElementText('song-overlay', '.bsr', mapInfo.beatSaverInfo ? mapInfo.beatSaverInfo.bsrKey : 'N/A');
        updateShadowElementImage('song-overlay', '.jacket img', mapInfo.image);
    }
}

