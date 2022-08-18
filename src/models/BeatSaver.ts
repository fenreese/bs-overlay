export enum RankedStatus {
    RANKED = "Ranked",
    QUALIFIED = "Qualified",
    UNRANKED = "Unranked",
}

export interface BeatSaverInfo {
    rankedStatus: RankedStatus;
    bsrKey: string;
    diffInfo?: BeatSaverDiffInfo
}

export interface BeatSaverDiffInfo {
    numBloqs: number;
    nps: number;
    njs: number;
    stars?: number
}

export interface BeatSaverDiffResponse {
    bombs: number,
    characteristic: string,
    chroma: boolean,
    cinema: boolean,
    difficulty: string,
    events: number,
    length: number,
    maxScore: number,
    me: boolean,
    ne: boolean,
    njs: number,
    notes: number,
    nps: number,
    obstacles: number,
    offset: number,
    paritySummary: {
        errors: number,
        resets: number,
        warns: number,
    },
    seconds: number,
    stars: number,
}

