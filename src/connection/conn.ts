import { ConstantBackoff, WebsocketBuilder } from 'websocket-ts';

export interface GameStates {
    paused: string,
    resumed: string,
    inMenu: string,
    inSong: string,

    // HTTPStatus
    startup?: string,

    // BS+
    mapInfo?: string,
    stateChange?: string,
}

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

        const _ws = new WebsocketBuilder(route)
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
}

