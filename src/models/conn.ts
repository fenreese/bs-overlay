import { BeatSaverInfo } from "./BeatSaver";

export enum MapDifficulty {
    EASY = 'Easy',
    NORMAL = 'Normal',
    HARD = 'Hard',
    EXPERT = 'Expert',
    EXPERTPLUS = 'ExpertPlus'
}

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

export interface MapInformation {
    title: string,
    subtitle?: string,
    artist: string,
    mapper: string,
    image: string,
    length: number,
    difficulty: MapDifficulty,
    beatSaverInfo?: BeatSaverInfo,
}