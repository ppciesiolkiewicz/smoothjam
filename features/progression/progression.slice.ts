import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChordProgressionModule, ScaleModule, ScaleType, ChordProgressionType } from 'utils/music';
import type { RootState } from 'store';
import { initialKeyTonic, initialKeyType, initialProgression } from './constants';

type NumeralChordProgressionType = {
    numerals: string[];
    name: string;
};

type ProgressionState = {
    selectedKeyTonic: string;
    selectedKeyType: string;
    selectedProgression: NumeralChordProgressionType;
    progressionChords: ChordProgressionType;
    scale: ScaleType;
};

const initialState: ProgressionState = {
    selectedKeyTonic: initialKeyTonic,
    selectedKeyType: initialKeyType,
    selectedProgression: initialProgression,
    progressionChords: ChordProgressionModule.create(initialKeyTonic, initialProgression.numerals),
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
                state.selectedProgression?.numerals
            );
        },
        setSelectedKeyType: (state, action: PayloadAction<string>) => {
            state.selectedKeyType = action.payload;
            state.scale = ScaleModule.get(state.selectedKeyTonic, state.selectedKeyType);
            state.progressionChords = ChordProgressionModule.create(
                state.selectedKeyTonic,
                state.selectedProgression?.numerals
            );
        },
        setSelectedProgression: (state, action: PayloadAction<NumeralChordProgressionType>) => {
            state.selectedProgression = action.payload;
            state.progressionChords = ChordProgressionModule.create(
                state.selectedKeyTonic,
                state.selectedProgression?.numerals
            );
        },
    },
});

export const selectProgressionChords = (state: RootState): ChordProgressionType => state.progression.progressionChords;
export const selectSelectedKeyTonic = (state: RootState): string => state.progression.selectedKeyTonic;
export const selectSelectedKeyType = (state: RootState): string => state.progression.selectedKeyType;
export const selectBeatCount = (state: RootState): number =>
    state.progression.progressionChords.reduce((acc, { beats }) => acc + beats, 0);
export const selectScale = (state: RootState): ScaleType => state.progression.scale;

export const { setSelectedKeyTonic, setSelectedKeyType, setSelectedProgression } = progressionSlice.actions;
export default progressionSlice.reducer;
