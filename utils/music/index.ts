import { transpose } from '@tonaljs/core';
import { Interval, Note, NoteLiteral, Progression, Key, Chord as TonalChord, Scale, Chord } from '@tonaljs/tonal';
import type { Chord as BasicChord } from '@tonaljs/chord'
import type { Note as NoteType } from '@tonaljs/note'

export interface Chord extends ChordType {
    suffix: string,
}

export type ChordProgression = {
    chord: Chord,
    beats: number,
}[];

export const createChordProgression = (keyTonic: NoteLiteral, progressionNumerals: string[]): ChordProgression => {
    progressionNumerals = progressionNumerals || [];
    return Progression.fromRomanNumerals(keyTonic, progressionNumerals).map(chordName => {
        const chord = TonalChord.get(chordName);
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

export const areNotesEqual = (n1: NoteType, n2: NoteType) => n1.chroma === n2.chroma && (!n1.oct || n1.oct === n2.oct);

export { Interval, Note, Progression, Key, Chord, Scale, transpose };
export type { NoteLiteral }