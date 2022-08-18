import $ from 'jquery';

import BSPConn from "./connection/BeatSaberPlus";
import HTTPConn from "./connection/HTTPStatus";
import * as Global from "./configs";
import SongOverlay from "./components/SongOverlay/index";

function init() {
    const content = $(".content");
    if (content) {
        content.text("Hello from Webpack!");
    }
    let websocket = null;
    // websocket = new HTTPConn(Global.LOCALHOST, Global.HTTPStatus.port, Global.HTTPStatus.entry);
    websocket = new BSPConn(Global.LOCALHOST, Global.BSPlus.port, Global.BSPlus.entry);
    const overlay = new SongOverlay();
}

init();