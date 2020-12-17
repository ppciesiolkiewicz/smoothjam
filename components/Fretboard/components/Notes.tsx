import React from 'react';
import styled from 'styled-components';
import { getNoteXYPosition } from '../utils';
import { NoteModule } from 'utils/music';
import { NoteType } from 'utils/music';
import { Note } from '@tonaljs/core';
import { NoNote } from '@tonaljs/tonal';

const Circle = styled.circle`
    ${({ isHighlighted, highlightColor, theme: { note } }) => {
        const fill = isHighlighted && note?.[highlightColor]?.fill ? note[highlightColor].fill : note.primary.fill;
        const stroke =
            isHighlighted && note?.[highlightColor]?.stroke ? note[highlightColor].stroke : note.primary.stroke;

        return `
            fill: ${fill};
            stroke: ${stroke};
        `;
    }}
`;

const Text = styled.text`
    pointer-events: none;
`;

type NotePositionProps = {
    stringNo: number;
    fretNo: number;
    note: NoteType;
    selectedNotes: NoteType[];
    intervals?: string[];
    highlightedNotes: { note: NoteType; highlightColor: string }[];
    stringCount: number;
    fretCount: number;
    onPointerEnter?: (note: NoteType) => void;
    onPointerLeave?: (note: NoteType) => void;
    onPointerUp?: (note: NoteType) => void;
    onPointerDown?: (note: NoteType) => void;
};

function NotePosition({
    stringNo,
    fretNo,
    note,
    selectedNotes,
    intervals,
    highlightedNotes,
    fretCount,
    stringCount,
    onPointerEnter,
    onPointerLeave,
    onPointerUp,
    onPointerDown,
}: NotePositionProps) {
    const [x, y] = getNoteXYPosition(stringNo, stringCount, fretNo, fretCount);
    const noteIndex = selectedNotes.findIndex(sn => NoteModule.areNotesEqual(sn, note));

    if (selectedNotes?.length && noteIndex === -1) {
        return null;
    }
    const interval = intervals && intervals[noteIndex];
    const highlight = highlightedNotes?.length && highlightedNotes.find(hn => NoteModule.areNotesEqual(hn.note, note));

    return (
        <g>
            <Circle
                onPointerEnter={() => onPointerEnter && onPointerEnter(note)}
                onPointerLeave={() => onPointerLeave && onPointerLeave(note)}
                onPointerUp={() => onPointerUp && onPointerUp(note)}
                onPointerDown={() => onPointerDown && onPointerDown(note)}
                isHighlighted={highlight}
                highlightColor={highlight?.highlightColor}
                cx={`${x}%`}
                cy={`${y}%`}
                r="20"
            ></Circle>
            <Text x={`${x}%`} y={`${y}%`} textAnchor="middle" strokeWidth="0.5" fontSize="10" dy=".3em">
                {note.name} {interval && `/ ${interval}`}
            </Text>
        </g>
    );
}

type NotesProps = {
    notes: NoteType[][];
    selectedNotes: NoteType[];
    intervals?: string[];
    highlightedNotes: { note: NoteType; highlightColor: string }[];
    stringCount: number;
    fretCount: number;
    notePointerEvents?: {
        onPointerEnter: (note: NoteType) => void;
        onPointerLeave: (note: NoteType) => void;
        onPointerUp: (note: NoteType) => void;
        onPointerDown: (note: NoteType) => void;
    };
};

function Notes({
    notes,
    highlightedNotes,
    selectedNotes,
    intervals,
    stringCount,
    fretCount,
    notePointerEvents,
}: NotesProps): JSX.Element {
    const notesOnFrets = notes.map((notesOnString, stringNo) =>
        notesOnString.map((note, fretNo) => {
            return (
                <NotePosition
                    key={note.name}
                    highlightedNotes={highlightedNotes}
                    selectedNotes={selectedNotes}
                    intervals={intervals}
                    stringCount={stringCount}
                    fretCount={fretCount}
                    stringNo={stringNo}
                    fretNo={fretNo}
                    note={note}
                    {...notePointerEvents}
                />
            );
        })
    );

    return <g>{notesOnFrets}</g>;
}

export default Notes;
