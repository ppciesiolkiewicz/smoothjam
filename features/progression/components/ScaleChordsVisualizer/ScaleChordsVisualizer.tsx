import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { selectScale } from 'features/progression/progression.slice';
import Chord from 'components/Chord';

function ScaleChordsVisualizer(): JSX.Element {
    const scale = useSelector(selectScale);

    return (
        <Box>
            <h3>Key chords</h3>
            <Grid container spacing={1}>
                {scale.allChords.map((chord, i) => (
                    <Grid key={i} item xs={6} sm={3} md={2}>
                        <Chord chord={chord} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ScaleChordsVisualizer;
