import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab } from '@material-ui/core';
import { PlayArrow, Stop } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { toggleStartMetronome, selectIsPlaying } from 'features/metronome/metronome.slice';

const useStyles = makeStyles(theme => ({
    secondary: {
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    primary: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        },
    },
}));

function StartStopButton(): JSX.Element {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toggleStart = () => dispatch(toggleStartMetronome());
    const isPlaying = useSelector(selectIsPlaying);

    return isPlaying ? (
        <Fab aria-label="stop" size="large" onClick={toggleStart} color="secondary" classes={classes}>
            <Stop />
        </Fab>
    ) : (
        <Fab aria-label="start" size="large" onClick={toggleStart} color="primary" classes={classes}>
            <PlayArrow />
        </Fab>
    );
}

export default StartStopButton;
