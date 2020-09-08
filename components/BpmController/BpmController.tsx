import React, { useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from 'store';
import { setBpm } from 'features/metronome/metronome.slice';
import { selectBpm } from 'features/metronome/metronome.slice';
import { Box, Slider, InputLabel } from '@material-ui/core';
import debounce from 'lodash.debounce';

const SET_BPM_DEBOUNCE_WAIT = 100;
const MIN_BPM = 30;
const MAX_BPM = 220;

function BpmController(): JSX.Element {
    const dispatch = useAppDispatch();
    const bpm = useAppSelector(selectBpm);
    const [localBpm, setLocalBpm] = useState(bpm);
    const debouncedSetBpm = useCallback(
        debounce(bpm => dispatch(setBpm(bpm)), SET_BPM_DEBOUNCE_WAIT),
        []
    );
    const handleBpmChange = (_, value) => {
        setLocalBpm(value);
        debouncedSetBpm(value);
    };

    return (
        <Box>
            <InputLabel id="bpm-slider-label">BPM</InputLabel>
            <Slider
                value={localBpm}
                onChange={handleBpmChange}
                aria-labelledby="bpm-slider-label"
                valueLabelDisplay="auto"
                step={1}
                min={MIN_BPM}
                max={MAX_BPM}
            />
        </Box>
    );
}

export default BpmController;
