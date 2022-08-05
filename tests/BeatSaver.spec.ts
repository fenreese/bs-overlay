import { expect } from 'chai';
import { BeatSaverInfo, getBeatSaverInfo } from '../src/connection/BeatSaver';

describe('Beat Saver info grabbing function', () => {

    // https://beatsaver.com/maps/1aa62
    it('should return info for bsr 1aa62', () => {
        const info: BeatSaverInfo = {
            rankedStatus: "Unranked",
            bsrKey: "1aa62",
            diffInfo: {
                numBloqs: 1121,
                njs: 16,
                nps: 5.42
            }
        }

        expect(
            getBeatSaverInfo("C5BDD63696BA2E316C446149A803173596C562C3", "ExpertPlus", "Standard")
        ).to.equal(info);
    });

});