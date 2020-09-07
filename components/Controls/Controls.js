import React from 'react';
import { Box } from '@material-ui/core';
import BpmController from 'components/BpmController';
import StartStopButton from 'components/StartStopButton';
import ProgressionSelector from 'components/ProgressionSelector';
import KeySelector from 'components/KeySelector';

function Controls() {
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
