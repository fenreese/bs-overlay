import $ from 'jquery';

import BSPConn from "./connection/BeatSaberPlus";
import HTTPConn from "./connection/HTTPStatus";
import * as Global from "./configs";
import SongOverlay from "./components/song-overlay/song-overlay.component";
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
            case '/song': {
                import('./components/song-overlay/song-overlay').then(() => {
                    $('#content').html('<song-overlay></song-overlay>');
                });
                this.setCurrentPage('song');
            }
            default: {
                import('./components/home-page/home-page').then(() => {
                    $('#content').html('<home></home>');
                });
                this.setCurrentPage('song');
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