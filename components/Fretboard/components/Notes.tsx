import React from 'react';
import styled from 'styled-components';
import { getNoteXYPosition } from '../utils';
import { areNotesEqual } from 'utils/progression';
import { Note as NoteType } from '@tonaljs/core';


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

function NotePosition({
    selectedNotes,
    highlightedNotes,
    stringNo,
    fretNo,
    fretCount,
    stringCount,
    note,
    onPointerEnter,
    onPointerLeave,
    onPointerUp,
    onPointerDown,
}) {
    const [x, y] = getNoteXYPosition(stringNo, stringCount, fretNo, fretCount);

    if (selectedNotes?.length && !selectedNotes.find(sn => areNotesEqual(sn, note))) {
        return null;
    }

    const highlight = highlightedNotes?.length && highlightedNotes.find(hn => areNotesEqual(hn.note, note));

    return (
        <g>
            <Circle
                onPointerEnter={() => onPointerEnter(note)}
                onPointerLeave={() => onPointerLeave(note)}
                onPointerUp={() => onPointerUp(note)}
                onPointerDown={() => onPointerDown(note)}
                isHighlighted={highlight}
                highlightColor={highlight?.highlightColor}
                cx={`${x}%`}
                cy={`${y}%`}
                r="20"
            ></Circle>
            <Text x={`${x}%`} y={`${y}%`} textAnchor="middle" strokeWidth="0.5" fontSize="10" dy=".3em">
                {note.name}
            </Text>
        </g>
    );
}

NotePosition.defaultProps = {
    onPointerEnter: () => {},
    onPointerLeave: () => {},
    onPointerUp: () => {},
    onPointerDown: () => {},
};

type NotesProps = {
    notes: NoteType[][],
    selectedNotes: NoteType[],
    highlightedNotes: { note: NoteType, highlightColor: string }[],
    stringCount: number,
    fretCount: number,
    notePointerEvents: {
        onPointerEnter: (note: NoteType) => void,
        onPointerLeave: (note: NoteType) => void,
        onPointerUp: (note: NoteType) => void,
        onPointerDown: (note: NoteType) => void,
    },
};

function Notes({ notes, highlightedNotes, selectedNotes, stringCount, fretCount, notePointerEvents }: NotesProps) {
    const notesOnFrets = notes.map((notesOnString, stringNo) =>
        notesOnString.map((note, fretNo) => {
            return (
                <NotePosition
                    key={note.name}
                    highlightedNotes={highlightedNotes}
                    selectedNotes={selectedNotes}
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


    return <g>{notesOnFrets}</g>
}

export default Notes;
