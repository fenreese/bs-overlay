export const BEATSAVER_URL = "https://api.beatsaver.com/maps/hash/";
export const LOCALHOST = "127.0.0.1";

// BS+
export const BSPlus = {
    port: "2947",
    entry: "socket"
}

// HTTPStatus
export const HTTPStatus = {
    port: "6557",
    entry: "socket"
}

// DataPuller 
export const DataPuller = {
    port: "2946",
    entry: "BSDataPuller/",
    class: {
        map: "MapData",
        play: "PlayData"
    }
}