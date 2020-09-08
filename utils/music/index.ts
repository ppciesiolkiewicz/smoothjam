import times from 'lodash.times';
import { transpose } from '@tonaljs/core';
import {
    Interval as TonalInterval,
    Note as TonalNote,
    Progression as TonalProgression,
    Chord as TonalChord,
    Scale as TonalScale,
} from '@tonaljs/tonal';

export interface ChordType extends ReturnType<typeof TonalChord.get> {
    readonly suffix: string;
}

export interface ScaleType extends ReturnType<typeof TonalScale.get> {
    readonly chordTypes: ReturnType<typeof TonalScale.scaleChords>;
}

export type ChordProgressionType = {
    readonly chord: ChordType;
    readonly beats: number;
}[];

export type NoteType = ReturnType<typeof TonalNote.get>;

export const NoteModule = {
    get: TonalNote.get,
    fromFreq: (freq: number): NoteType => {
        const noteName = TonalNote.fromFreq(freq);
        return TonalNote.get(noteName);
    },
    areNotesEqual: (n1: NoteType, n2: NoteType): boolean => n1.chroma === n2.chroma && (!n1.oct || n1.oct === n2.oct),
    getGuitarNotes: (tuning: string[], fretCount: number): NoteType[][] => {
        return tuning.map(rootNote => {
            return times(fretCount - 1, fretNo => {
                const noteSymbol = transpose(rootNote, TonalInterval.fromSemitones(fretNo));
                const note = TonalNote.get(noteSymbol);

                return note;
            });
        });
    },
};

export const ChordProgressionModule = {
    create: (keyTonic: string, progressionNumerals: string[]): ChordProgressionType => {
        progressionNumerals = progressionNumerals || [];
        return TonalProgression.fromRomanNumerals(keyTonic, progressionNumerals).map(chordName => {
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
    },
};

export const ScaleModule = {
    get: (keyTonic: string, keyType: string): ScaleType => {
        const scale = TonalScale.get(`${keyTonic} ${keyType}`);
        const scaleChordTypes = TonalScale.scaleChords(`${keyTonic} ${keyType}`);

        return {
            ...scale,
            chordTypes: scaleChordTypes,
        };
    },
    names: TonalScale.names,
};
