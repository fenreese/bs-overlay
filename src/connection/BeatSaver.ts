import { getAPI } from "../helpers/api";
import { Global } from "../globals";

export interface BeatSaverInfo {
    rankedStatus: string;
    bsrKey: string;
    diffInfo?: BeatSaverDiffInfo
}

export interface BeatSaverDiffInfo {
    numBloqs: number;
    nps: number;
    njs: number
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
    paritySummary: Object,
    seconds: number,
    stars: number,
}

export const getBeatSaverInfo = async (hash: String, difficulty: String, characteristic: String): Promise<BeatSaverInfo | any> => {
    try {
        let dataJSON: any = await getAPI(Global.BEATSAVER_URL + hash);
        // console.log(dataJSON);

        let currentChart = <BeatSaverDiffResponse>{};
        let currDiffInfo = <BeatSaverDiffInfo>{};

        // what does BeatSaver say about the stats of this map?
        for (let diff in dataJSON.versions[0].diffs) {
            let diffInfo = dataJSON.versions[0].diffs[diff];
            if (diffInfo.characteristic === characteristic &&
                diffInfo.difficulty === difficulty) {
                currentChart = diffInfo;
                break;
            }
        }
        // console.log(currentChart);

        if (Object.keys(currentChart).length === 0) {
            throw new Error('no matching difficulty found');
        }

        if (currentChart.length) {
            currDiffInfo = {
                numBloqs: currentChart.notes,
                nps: currentChart.nps,
                njs: currentChart.njs,
            };
        }

        let rankedStatus = "Unranked";

        if (dataJSON.qualified) {
            rankedStatus = "Qualified";
        } else if (dataJSON.ranked) {
            rankedStatus = "Ranked";
        }

        let info: BeatSaverInfo = {
            rankedStatus,
            bsrKey: dataJSON.id,
            diffInfo: currDiffInfo,
        }
        // console.log(info);

        return info;
    } catch (err) {
        console.log(err);
    }
}
