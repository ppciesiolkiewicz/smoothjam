import React from 'react';
import { Provider } from 'react-redux';
import { Box } from '@material-ui/core';
import store from 'store';
import Controls from 'components/Controls';
import ProgressionVisualizer from 'features/progression/components/ProgressionVisualizer';
import Metronome from 'features/metronome/components/Metronome';
import ProgressionChordsVisualizer from 'features/progression/components/ProgressionChordsVisualizer';
import ScaleChordsVisualizer from 'features/progression/components/ScaleChordsVisualizer';

import ScaleVisualizer from 'features/progression/components/ScaleVisualizer';
import PitchDetector from 'features/pitch/components/PitchDetector';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

function App(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Provider store={store}>
                    <Box m={2}>
                        <ScaleVisualizer />
                        <Metronome />
                        <Controls />
                        <ProgressionVisualizer />
                        <ProgressionChordsVisualizer />
                        <ScaleChordsVisualizer />
                        <PitchDetector />
                    </Box>
                </Provider>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
