import { getAPI } from "../helpers/api";
import { Global } from "../globals";

export interface BeatSaverInfo {
    rankedStatus: string;
    bsrKey: string;
    diffInfo?: BeatSaverDiffInfo
}

export interface BeatSaverDiffInfo {
    numBloqs?: number;
    nps?: number;
    njs?: number
}

export const getBeatSaverInfo = async (hash: String, difficulty: String, characteristic: String): Promise<any> => {

    try {
        let dataJSON: any = await getAPI(Global.BEATSAVER_URL + hash);

        if (!("error" in dataJSON)) {
            let currentChart = [];
            let currDiffInfo: BeatSaverDiffInfo = {};

            // what does BeatSaver say about the stats of this map?
            for (let diff in dataJSON.versions[0].diffs) {
                let diffInfo = dataJSON.versions[0].diffs[diff];
                if (diffInfo.characteristic === characteristic &&
                    diffInfo.difficulty === difficulty) {
                    currentChart == diffInfo;
                    break;
                }
            }

            if (currentChart.length) {
                currDiffInfo = {
                    numBloqs: currentChart.notes,
                    nps: currentChart.nps.toFixed(2),
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

            return info;
        }
    } catch (err) {
        console.log(err);
    }
}
