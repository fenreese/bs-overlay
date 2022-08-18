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

export interface BSWS {
    websocket: WebSocket,
    isConnected: boolean,
}

export abstract class Conn {
    protected gameStates: GameStates;
    protected ws: any; // create another websocket in DPuller.ts 
    protected route: any;

    constructor(ip: string, port: string, entry: string, gameStates: GameStates) {
        this.gameStates = gameStates;

        this.route = `ws://${ip}:${port}/${entry}`;
        console.log(`Connecting to websocket on ${this.route}...`)
        this.ws = this.initWebsocket(this.route);
    }

    private initWebsocket(route: string): BSWS {
        const bsws: BSWS = {
            isConnected: false,
            websocket: new WebSocket(route),
        }

        this.connectWebSocket(bsws);

        return bsws;
    }

    private connectWebSocket(ws: BSWS) {
        ws.websocket.onopen = () => {
            console.log('Connected to websocket!');
            ws.isConnected = true;
        }

        ws.websocket.onclose = () => {
            ws.isConnected = false;
            console.log(`Connection to ${this.route} failed, retrying in 5 seconds...`);
            setTimeout(this.connectWebSocket, 5000);
        }

        ws.websocket.onmessage = (message: any) => {
            const msg = JSON.parse(message.data);
            this.parseMessage(msg);
        }
    }

    abstract parseMessage(message: any): void;
    abstract parseMapInfo(mapInfo: any): void;
}
