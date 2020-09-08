import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteLiteral } from '@tonaljs/tonal';

type PitchState = {
    pitch: number,
    note: NoteLiteral,
};

const initialState: PitchState = {
    pitch: null,
    note: null,
};

const pitchSlice = createSlice({
    name: 'pitch',
    initialState,
    reducers: {
        setDetectedPitch: (state, action: PayloadAction<number>) => {
            state.pitch = action.payload;
            state.note = Note.fromFreq(action.payload);
        },
    },
});

export const { setDetectedPitch } = pitchSlice.actions;
export default pitchSlice.reducer;
