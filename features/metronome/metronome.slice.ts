import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';

type MetronomeState = {
    isPlaying: boolean;
    currentBeat: number;
    bpm: number;
};

const initialState: MetronomeState = {
    isPlaying: false,
    currentBeat: -1,
    bpm: 100,
};

const metronomeSlice = createSlice({
    name: 'metronome',
    initialState,
    reducers: {
        toggleStartMetronome: state => {
            state.isPlaying = !state.isPlaying;
        },
        setCurrentBeat: (state, action: PayloadAction<number>) => {
            state.currentBeat = action.payload;
        },
        setBpm: (state, action: PayloadAction<number>) => {
            state.bpm = action.payload;
        },
    },
});

export const selectIsPlaying = (state: RootState): boolean => state.metronome.isPlaying;
export const selectBpm = (state: RootState): number => state.metronome.bpm;
export const selectCurrentBeat = (state: RootState): number => state.metronome.currentBeat;

export const { toggleStartMetronome, setCurrentBeat, setBpm } = metronomeSlice.actions;
export default metronomeSlice.reducer;
