import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
        setCurrentBeat: (state, action) => {
            state.currentBeat = action.payload;
        },
        setBpm: (state, action) => {
            state.bpm = action.payload;
        },
    },
});

export const selectIsPlaying = state => state.metronome.isPlaying;
export const selectBpm = state => state.metronome.bpm;
export const selectCurrentBeat = state => state.metronome.currentBeat;

export const { toggleStartMetronome, setCurrentBeat, setBpm } = metronomeSlice.actions;
export default metronomeSlice.reducer;
