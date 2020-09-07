import { Progression, Key, Chord, Scale } from '@tonaljs/tonal';

export const createChordProgression = (keyTonic, progressionNumerals) => {
    progressionNumerals = progressionNumerals || [];
    return Progression.fromRomanNumerals(keyTonic, progressionNumerals).map(chordName => {
        const chord = Chord.get(chordName);
        const { type, tonic, symbol } = chord;
        const suffix = ['major', 'minor'].indexOf(type) !== -1 ? type : symbol.slice(tonic.length);

        return {
            chord: {
                ...chord,
                suffix,
            },
            beats: 4,
        };
    });
};

export const getKey = (tonic, type) => {
    const key = type === 'major' ? Key.majorKey(tonic) : Key.minorKey(tonic);

    return key;
};

export const getScale = (key, type) => {
    const scale = Scale.get(`${key} ${type}`);
    const scaleChordTypes = Scale.scaleChords(`${key} ${type}`);

    return {
        ...scale,
        chordTypes: scaleChordTypes,
    };
};

export const areNotesEqual = (n1, n2) => n1.chroma === n2.chroma && (!n1.oct || n1.oct === n2.oct);
