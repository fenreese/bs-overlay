import { BeatSaverInfo, RankedStatus } from '../src/models/BeatSaver';
import { getBeatSaverInfo } from '../src/connection/BeatSaver';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { assert } from 'chai';

chai.use(chaiAsPromised);

describe('Beat Saver info grabbing function', () => {
    // https://beatsaver.com/maps/1aa62
    // unranked test. why does this take 500ms
    it('should return info for fatbeanzoop and razy\'s Kiss Me More', async () => {
        const info: BeatSaverInfo = {
            rankedStatus: RankedStatus.UNRANKED,
            bsrKey: "1aa62",
            diffInfo: {
                numBloqs: 1121,
                nps: 5.415,
                njs: 16
            }
        };

        return assert.becomes(getBeatSaverInfo("C5BDD63696BA2E316C446149A803173596C562C3", "ExpertPlus", "Standard"), info);
    });

    // https://beatsaver.com/maps/1a67e
    // ranked test. why does this take 140ms
    it('should return info for foxyboi\'s E+ cold weather', async () => {
        const info: BeatSaverInfo = {
            rankedStatus: RankedStatus.RANKED,
            bsrKey: "1a67e",
            diffInfo: {
                numBloqs: 1429,
                nps: 9.302,
                njs: 21
            }
        };

        return assert.becomes(getBeatSaverInfo("A043595F41E8B23CE5DB900218C4B13C74149BCA", "ExpertPlus", "Standard"), info);
    });
});