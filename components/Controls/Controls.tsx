import React from 'react';
import { Box } from '@material-ui/core';
import BpmController from 'features/metronome/components/BpmController';
import StartStopButton from 'features/metronome/components/StartStopButton';
import ProgressionSelector from 'features/progression/components/ProgressionSelector';
import KeySelector from 'features/progression/components/KeySelector';

function Controls(): JSX.Element {
    return (
        <Box>
            <StartStopButton />
            <BpmController />
            <KeySelector />
            <ProgressionSelector />
        </Box>
    );
}

export default Controls;
