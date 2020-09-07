import { createChordProgression } from './progression';

describe('progression.utils', () => {
    describe('createChordProgression', () => {
        it('Should return empty array when no numerals and tonic are provided', () => {
            const result = createChordProgression();
            expect(result).toEqual([]);
        });
    });
});
