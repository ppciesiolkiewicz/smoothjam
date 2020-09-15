import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Chord from '@tombatossals/react-chords/lib/Chord';
import { IconButton, Typography, Box } from '@material-ui/core';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';
import createCircularArray from 'utils/CircularArray';
import { guitarChords } from './constants';

const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

type ChordProps = {
    chord: {
        tonic: string;
        suffix: string;
        symbol: string;
    };
};

function ChordComponent({ chord: { tonic, suffix, symbol } }: ChordProps): JSX.Element {
    const [selectedPositionIdx, setSelectedPositionIdx] = useState(0);
    const chordPositions = useMemo(
        () =>
            createCircularArray((guitarChords.chords?.[tonic] ?? []).find(c => c?.suffix === suffix)?.positions ?? []),
        [tonic, suffix]
    );
    const chordPosition = chordPositions?.[selectedPositionIdx];

    if (!chordPosition) {
        console.error('No chord for ', { tonic, suffix });
        return null;
    }

    const nextPosition = () => {
        setSelectedPositionIdx(selectedPositionIdx + 1);
    };
    const prevPosition = () => {
        setSelectedPositionIdx(selectedPositionIdx - 1);
    };

    return (
        <Box>
            <Typography>{symbol}</Typography>
            <NavigationContainer>
                <IconButton size="small" onClick={prevPosition}>
                    <NavigateBefore />
                </IconButton>
                <Typography>
                    {chordPositions.getBoundedIndex(selectedPositionIdx) + 1}/{chordPositions.length}
                </Typography>
                <IconButton size="small" onClick={nextPosition}>
                    <NavigateNext />
                </IconButton>
            </NavigationContainer>
            <Chord
                chord={chordPosition}
                instrument={{
                    strings: 6,
                    fretsOnChord: 4,
                    name: 'Guitar',
                    keys: [],
                    tunings: {
                        standard: ['E', 'A', 'D', 'G', 'B', 'E'],
                    },
                }}
                lite={false}
            />
        </Box>
    );
}

export default ChordComponent;
