import BSPConn from "./connection/BeatSaberPlus";
import HTTPConn from "./connection/HTTPStatus";
import * as Global from "./globals";

function init() {
    const placeholder = document.querySelector(".placeholder");
    if (placeholder != null) {
        placeholder.textContent = "Hello from Webpack!";
    }
    let websocket = null;
    // websocket = new HTTPConn(Global.LOCALHOST, Global.HTTPStatus.port, Global.HTTPStatus.entry);
    websocket = new BSPConn(Global.LOCALHOST, Global.BSPlus.port, Global.BSPlus.entry);
}

init();