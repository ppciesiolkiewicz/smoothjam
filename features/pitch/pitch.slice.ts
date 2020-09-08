import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteModule, NoteType } from 'utils/music';
import type { RootState } from 'store';

type PitchState = {
    pitch?: number;
    note?: NoteType;
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
            state.note = NoteModule.fromFreq(action.payload);
        },
    },
});

export const selectDetectedNote = (state: RootState): NoteType => state.pitch.note;

export const { setDetectedPitch } = pitchSlice.actions;
export default pitchSlice.reducer;
