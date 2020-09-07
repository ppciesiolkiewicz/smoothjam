import React from 'react';
import styled from 'styled-components';
import { getNoteXYPosition } from '../utils';
import { areNotesEqual } from 'utils/progression';

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
    notes: any[][],
    selectedNotes: any[],
    highlightedNotes: { note: any, highlightColor: string }[],
    stringCount: number,
    fretCount: number,
    notePointerEvents: {
        onPointerEnter: (note: any) => void,
        onPointerLeave: (note: any) => void,
        onPointerUp: (note: any) => void,
        onPointerDown: (note: any) => void,
    },
};

function Notes({ notes, highlightedNotes, selectedNotes, stringCount, fretCount, notePointerEvents }: NotesProps) {
    return notes.map((notesOnString, stringNo) =>
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
}

export default Notes;
