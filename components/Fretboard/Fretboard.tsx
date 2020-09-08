import React, { useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { NoteType, NoteModule } from 'utils/music';
import Strings from './components/Strings';
import Frets from './components/Frets';
import Inlays from './components/Inlays';
import Notes from './components/Notes';

const Container = styled.div`
    margin: 50px;
    height: 300px;
    width: 70%;
    user-select: none;
`;

type FretboardProps = {
    tuning: string[];
    fretCount: number;
    selectedNotes: string[];
    highlightedNotes: { note: string; highlightColor: string }[];
    theme: {
        note: {
            primary: {
                fill: string;
                stroke: string;
            };
        };
        stringColor: string;
        fretColor: string;
    };
    reversed: boolean;
    notePointerEvents?: {
        onPointerEnter: (note: NoteType) => void;
        onPointerLeave: (note: NoteType) => void;
        onPointerDown: (note: NoteType) => void;
        onPointerUp: (note: NoteType) => void;
    };
};

function Fretboard({
    fretCount,
    tuning,
    selectedNotes,
    highlightedNotes,
    theme,
    reversed,
    notePointerEvents,
}: FretboardProps): JSX.Element {
    const stringCount = tuning.length;
    const selectedNotesObj = useMemo(() => selectedNotes.map(n => NoteModule.get(n)), [selectedNotes]);
    const highlightedNotesObj = useMemo(() => highlightedNotes.map(n => ({ ...n, note: NoteModule.get(n.note) })), [
        highlightedNotes,
    ]);

    const notes = useMemo(() => {
        const t = reversed ? tuning.slice(0).reverse() : tuning;
        return NoteModule.getGuitarNotes(t, fretCount);
    }, [tuning, fretCount, reversed]);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="100%"
                    height="100%"
                    stroke="black"
                    strokeWidth="1"
                    fill="white"
                    shapeRendering="geometricPrecision"
                    style={{ overflow: 'visible' }}
                    transform="translate(-36 0)"
                >
                    <Strings stringCount={stringCount} fretCount={fretCount} reversed={reversed} />
                    <Frets fretCount={fretCount} />
                    <Notes
                        notes={notes}
                        highlightedNotes={highlightedNotesObj}
                        selectedNotes={selectedNotesObj}
                        stringCount={stringCount}
                        fretCount={fretCount}
                        notePointerEvents={notePointerEvents}
                    />
                    <Inlays fretCount={fretCount} />
                </svg>
            </Container>
        </ThemeProvider>
    );
}

Fretboard.defaultProps = {
    tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    fretCount: 12, // TODO: fix how this number is treated
    reversed: true,
    selectedNotes: [],
    highlightedNotes: [],
    theme: {
        note: {
            primary: {
                fill: '#eee',
                stroke: '#000',
            },
            highlight1: {
                fill: '#99c',
                stroke: '#44a',
            },
            highlight2: {
                fill: '#a77',
                stroke: '#000',
            },
        },
        stringColor: '#111',
        fretColor: '#111',
    },
};

export default Fretboard;
