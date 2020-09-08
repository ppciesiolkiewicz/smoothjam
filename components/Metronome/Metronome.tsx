import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { usePrevious } from 'utils/hooks';
import { setCurrentBeat, selectIsPlaying, selectBpm } from 'features/metronome/metronome.slice';
import Metronome from 'utils/Metronome';

function MetronomeComponent() {
    const dispatch = useAppDispatch();
    const isPlaying = useAppSelector(selectIsPlaying);
    const bpm = useAppSelector(selectBpm);
    const previousBpm = usePrevious(bpm);
    const previousIsPlaying = usePrevious(isPlaying);
    const metronome = useRef(null);

    useEffect(() => {
        metronome.current = new Metronome(() => {
            dispatch(setCurrentBeat(metronome.current.currentBeat));
        }, bpm);
    }, []);
    useEffect(() => {
        if (previousIsPlaying !== undefined) {
            metronome.current.toggleStart();
        }
    }, [isPlaying])
    useEffect(() => {
        if (previousBpm !== undefined) {
            metronome.current.bpm = bpm;
        }
    }, [bpm])


    return null;
}


export default MetronomeComponent;