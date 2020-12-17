import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import { selectProgressionChords } from 'features/progression/progression.slice';
import Chord from 'components/Chord';

function ScaleChordsVisualizer(): JSX.Element {
    const progressionChords = useSelector(selectProgressionChords);

    return (
        <Box>
            <h3>Progression chords</h3>
            <Grid container spacing={1}>
                {progressionChords.map(({ chord }, i) => (
                    <Grid key={i} item xs={6} sm={3} md={2}>
                        <Chord chord={chord} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ScaleChordsVisualizer;
