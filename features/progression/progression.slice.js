import { createSlice } from '@reduxjs/toolkit';
import { createChordProgression, getKey, getScale } from 'utils/progression';
import { Scale } from '@tonaljs/tonal';

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
const availableKeyTonics = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const availableKeyTypes = Scale.names().sort();

const initialProgressionIndex = 0;
const initialKeyTonic = 'C';
const initialKeyType = 'major';

const initialState = {
    availableKeyTonics,
    availableProgressions,
    availableKeyTypes,

    selectedProgressionIndex: initialProgressionIndex,
    selectedKeyTonic: initialKeyTonic,
    selectedKeyType: initialKeyType,
    progressionChords: createChordProgression(
        initialKeyTonic,
        availableProgressions[initialKeyType][initialProgressionIndex].numerals
    ),
    key: getKey(initialKeyTonic, initialKeyType),
    scale: getScale(initialKeyTonic, initialKeyType),
};

const progressionSlice = createSlice({
    name: 'progression',
    initialState,
    reducers: {
        setSelectedKeyTonic: (state, action) => {
            state.selectedKeyTonic = action.payload;
            state.key = getKey(state.selectedKeyTonic, state.selectedKeyType);
            state.scale = getScale(state.selectedKeyTonic, state.selectedKeyType);
            state.progressionChords = createChordProgression(
                state.selectedKeyTonic,
                availableProgressions?.[state.selectedKeyType]?.[state.selectedProgressionIndex]?.numerals
            );
        },
        setSelectedKeyType: (state, action) => {
            state.selectedKeyType = action.payload;
            state.selectedProgressionIndex = 0;
            state.key = getKey(state.selectedKeyTonic, state.selectedKeyType);
            state.scale = getScale(state.selectedKeyTonic, state.selectedKeyType);
            state.progressionChords = createChordProgression(
                state.selectedKeyTonic,
                availableProgressions?.[state.selectedKeyType]?.[state.selectedProgressionIndex]?.numerals
            );
        },
        setSelectedProgressionIndex: (state, action) => {
            state.selectedProgressionIndex = action.payload;
            state.progressionChords = createChordProgression(
                state.selectedKeyTonic,
                availableProgressions?.[state.selectedKeyType]?.[state.selectedProgressionIndex]?.numerals
            );
        },
    },
});

export const selectProgressionChords = state => state.progression.progressionChords;
export const selectSelectedKeyTonic = state => state.progression.selectedKeyTonic;
export const selectSelectedKeyType = state => state.progression.selectedKeyType;
export const selectSelectedProgressionIndex = state => state.progression.selectedProgressionIndex;
export const selectBeatCount = state => state.progression.progressionChords.reduce((acc, { beats }) => acc + beats, 0);
export const selectAvailableKeys = state => state.progression.availableKeyTonics;
const defaultAvailableProgressions = [];
export const selectAvailableProgressions = ({ progression }) =>
    progression.availableProgressions[progression.selectedKeyType] || defaultAvailableProgressions;
export const selectSelectedProgressionIndexIndex = ({ progression }) => progression.selectedProgressionIndex;
export const selectScale = ({ progression }) => progression.scale;

export const { setSelectedKeyTonic, setSelectedKeyType, setSelectedProgressionIndex } = progressionSlice.actions;
export default progressionSlice.reducer;
