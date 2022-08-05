import { BeatSaverInfo, getBeatSaverInfo } from '../src/connection/BeatSaver';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { assert } from 'chai';

chai.use(chaiAsPromised);

describe('Beat Saver info grabbing function', () => {

    // https://beatsaver.com/maps/1aa62
    it('should return info for bsr 1aa62', async () => {
        const info: BeatSaverInfo = {
            rankedStatus: "Unranked",
            bsrKey: "1aa62",
            diffInfo: {
                numBloqs: 1121,
                nps: 5.415,
                njs: 16
            }
        }

        return assert.becomes(getBeatSaverInfo("C5BDD63696BA2E316C446149A803173596C562C3", "ExpertPlus", "Standard"), info);
    });

});