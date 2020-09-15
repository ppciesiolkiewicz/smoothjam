import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import Controls from 'components/Controls';
import ProgressionVisualizer from 'features/progression/components/ProgressionVisualizer';
import Metronome from 'features/metronome/components/Metronome';
import ChordVisualizer from 'features/progression/components/ChordsVisualizer';
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
                    <ScaleVisualizer />
                    <Metronome />
                    <Controls />
                    <ProgressionVisualizer />
                    <ChordVisualizer />
                    <PitchDetector />
                </Provider>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
