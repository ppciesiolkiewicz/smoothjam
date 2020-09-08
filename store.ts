import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import metronome from 'features/metronome/metronome.slice';
import progression from 'features/progression/progression.slice';
import pitch from 'features/pitch/pitch.slice';

const store = configureStore({
    reducer: { metronome, progression, pitch },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
