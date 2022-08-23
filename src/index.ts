import $ from 'jquery';

// idfk man lol
import BSPConn from "./connection/BeatSaberPlus";
import HTTPConn from "./connection/HTTPStatus";

// lazy load + overlay switch kinda wonky
import './components/song-overlay/song-overlay';
import './components/home-page/home-page';

import * as Global from "./configs";
import { Conn } from './connection/conn';

class Overlay {
    private connection: Conn;
    private currentPage: string;

    constructor() {
        // websocket = new HTTPConn(Global.LOCALHOST, Global.HTTPStatus.port, Global.HTTPStatus.entry);
        this.connection = new BSPConn(Global.LOCALHOST, Global.BSPlus.port, Global.BSPlus.entry);
        this.currentPage = window.location.pathname;
    }

    public switchRoute(page: string) {
        switch (page) {
            case '/song-overlay': {
                $('#content').html('<song-overlay></song-overlay>');
                this.setCurrentPage('song-overlay');
                break;
            }
            default: {
                $('#content').html('<home-page></home-page>');
                this.setCurrentPage('home-page');
                break;
            }
        }
    }

    public setCurrentPage(newPage: string) {
        this.currentPage = newPage;
    }
}

window.onload = () => {
    const overlay = new Overlay();
    overlay.switchRoute(window.location.pathname);
}

console.log(customElements.get('song-overlay'));