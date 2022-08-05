export interface GameStates {
    inMenu: string,
    inSong: string,
    paused: string,
    resumed: string,
    mapInfo?: string,
    startup?: string,
}

export interface BSWS {
    websocket: WebSocket,
    websocket2?: WebSocket,
    isConnected: boolean,
}

export abstract class Conn {
    private gameStates: GameStates;
    private ws: any;
    private route: any;

    constructor(ip: string, port: string, entry: string, gameStates: GameStates, endpoints?: Array<string>) {
        this.gameStates = gameStates;

        // DataPuller moment
        if (endpoints) {
            this.route = Array<string>;
            this.ws = Array<BSWS>;

            for (let r = 0; r < endpoints?.length || r < 1; r++) {
                this.route[r] = `ws://${ip}:${port}/${entry}` + (endpoints[r] ? endpoints[r] : ``);
                this.ws = this.initWebsocket(this.route[r]);
            }
        } else {
            this.route = `ws://${ip}:${port}/${entry}`;
            this.ws = this.initWebsocket(this.route);
        }

        this.connectWebSocket();
    }

    private initWebsocket(route: string): BSWS {
        let bsws: BSWS = {
            isConnected: false,
            websocket: new WebSocket(route),
        }

        return bsws;
    }

    private connectWebSocket() {
        this.ws.websocket.onopen = () => {
            console.log('Connected to websocket!');
            this.ws.isConnected = true;
        }

        this.ws.websocket.onclose = () => {
            console.log(`Connection to ${this.route} failed, retrying in 5 seconds...`);
            setTimeout(this.connectWebSocket, 5000);
        }

        this.ws.websocket.onmessage = (message: any) => {
            this.parseMessage(message);
        }
    }

    // extra for DataPuller
    abstract parseMessage(message: any, extra?: any): void;
}
