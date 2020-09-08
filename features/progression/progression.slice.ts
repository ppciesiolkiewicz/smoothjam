import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChordProgressionModule, ScaleModule, ScaleType, ChordProgressionType } from 'utils/music';
import type { RootState } from 'store';

const availableProgressions = {
    major: [
        {
            numerals: ['I', 'IV', 'V'],
            name: 'I-IV-V',
        },
        {
            numerals: ['I', 'IV', 'V'],
            name: 'I-IV-V',
        },
        {
            numerals: ['I', 'IIm', 'V'],
            name: 'I-IIm-V',
        },
        {
            numerals: ['I', 'VIm', 'IIm', 'V'],
            name: 'I-VIm-IIm-V',
        },
        {
            numerals: ['I', 'IIIm', 'VIm', 'IIm', 'V'],
            name: 'I-IIIm-VIm-IIm-V',
        },
    ],
    minor: [
        {
            numerals: ['I', 'IIIm', 'VIm', 'IIm', 'V'],
            name: 'I-IIIm-VIm-IIm-V',
        },
    ],
};

type NumeralChordProgressionType = {
    numerals: string[];
    name: string;
};

type ProgressionState = {
    availableKeyTonics: string[];
    availableProgressions: {
        [keyType: string]: NumeralChordProgressionType[];
    };
    availableKeyTypes: string[];
    selectedProgressionIndex: number;
    selectedKeyTonic: string;
    selectedKeyType: string;
    progressionChords: ChordProgressionType;
    scale: ScaleType;
};

const availableKeyTonics: string[] = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const availableKeyTypes: string[] = ScaleModule.names().sort();

const initialProgressionIndex = 0;
const initialKeyTonic = 'C';
const initialKeyType = 'major';

const initialState: ProgressionState = {
    availableKeyTonics,
    availableProgressions,
    availableKeyTypes,
    selectedProgressionIndex: initialProgressionIndex,
    selectedKeyTonic: initialKeyTonic,
    selectedKeyType: initialKeyType,
    progressionChords: ChordProgressionModule.create(
        initialKeyTonic,
        availableProgressions[initialKeyType][initialProgressionIndex].numerals
    ),
    scale: ScaleModule.get(initialKeyTonic, initialKeyType),
};

const progressionSlice = createSlice({
    name: 'progression',
    initialState,
    reducers: {
        setSelectedKeyTonic: (state, action: PayloadAction<string>) => {
            state.selectedKeyTonic = action.payload;
            state.scale = ScaleModule.get(state.selectedKeyTonic, state.selectedKeyType);
            state.progressionChords = ChordProgressionModule.create(
                state.selectedKeyTonic,
                availableProgressions?.[state.selectedKeyType]?.[state.selectedProgressionIndex]?.numerals
            );
        },
        setSelectedKeyType: (state, action: PayloadAction<string>) => {
            state.selectedKeyType = action.payload;
            state.selectedProgressionIndex = 0;
            state.scale = ScaleModule.get(state.selectedKeyTonic, state.selectedKeyType);
            state.progressionChords = ChordProgressionModule.create(
                state.selectedKeyTonic,
                availableProgressions?.[state.selectedKeyType]?.[state.selectedProgressionIndex]?.numerals
            );
        },
        setSelectedProgressionIndex: (state, action: PayloadAction<number>) => {
            state.selectedProgressionIndex = action.payload;
            state.progressionChords = ChordProgressionModule.create(
                state.selectedKeyTonic,
                availableProgressions?.[state.selectedKeyType]?.[state.selectedProgressionIndex]?.numerals
            );
        },
    },
});

export const selectProgressionChords = (state: RootState): ChordProgressionType => state.progression.progressionChords;
export const selectSelectedKeyTonic = (state: RootState): string => state.progression.selectedKeyTonic;
export const selectSelectedKeyType = (state: RootState): string => state.progression.selectedKeyType;
export const selectSelectedProgressionIndex = (state: RootState): number => state.progression.selectedProgressionIndex;
export const selectBeatCount = (state: RootState): number =>
    state.progression.progressionChords.reduce((acc, { beats }) => acc + beats, 0);
export const selectAvailableKeys = (state: RootState): string[] => state.progression.availableKeyTonics;
const defaultAvailableProgressions = [];
export const selectAvailableProgressions = (state: RootState): NumeralChordProgressionType[] =>
    state.progression.availableProgressions[state.progression.selectedKeyType] || defaultAvailableProgressions;
export const selectSelectedProgressionIndexIndex = (state: RootState): number =>
    state.progression.selectedProgressionIndex;
export const selectScale = (state: RootState): ScaleType => state.progression.scale;

export const { setSelectedKeyTonic, setSelectedKeyType, setSelectedProgressionIndex } = progressionSlice.actions;
export default progressionSlice.reducer;
