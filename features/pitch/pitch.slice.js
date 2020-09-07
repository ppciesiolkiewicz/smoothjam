import { createSlice } from '@reduxjs/toolkit';
import { Note } from '@tonaljs/tonal';

const initialState = {
    pitch: null,
    note: null,
};

const pitchSlice = createSlice({
    name: 'pitch',
    initialState,
    reducers: {
        setDetectedPitch: (state, action) => {
            state.pitch = action.payload;
            state.note = Note.fromFreq(action.payload);
        },
    },
});

export const { setDetectedPitch } = pitchSlice.actions;
export default pitchSlice.reducer;
