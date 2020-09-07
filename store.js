import { configureStore } from '@reduxjs/toolkit';
import metronome from 'features/metronome/metronome.slice';
import progression from 'features/progression/progression.slice';
import pitch from 'features/pitch/pitch.slice';

export default configureStore({
    reducer: { metronome, progression, pitch },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true,
});
