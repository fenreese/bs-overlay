import { getAPI } from "../helpers/api";
import * as Global from "../globals";
import { BeatSaverDiffResponse, BeatSaverDiffInfo, BeatSaverInfo, RankedStatus } from '../models/BeatSaver';

export const getBeatSaverInfo = async (hash: string, difficulty: string, characteristic: string): Promise<BeatSaverInfo | any> => {
    try {
        const dataJSON: any = await getAPI(Global.BEATSAVER_URL + hash);
        // console.log(dataJSON);

        let currentChart = <BeatSaverDiffResponse>{};
        let currDiffInfo = <BeatSaverDiffInfo>{};

        // what does BeatSaver say about the stats of this map?
        for (const diff in dataJSON.versions[0].diffs) {
            const diffInfo = dataJSON.versions[0].diffs[diff];
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

        let rankedStatus = RankedStatus.UNRANKED;

        if (dataJSON.qualified) {
            rankedStatus = RankedStatus.QUALIFIED;
        } else if (dataJSON.ranked) {
            rankedStatus = RankedStatus.RANKED;
            currDiffInfo.stars = currentChart.stars;
        }

        const info: BeatSaverInfo = {
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
