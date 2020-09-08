import React from 'react';
import { useSelector } from 'react-redux';
import { selectScale } from 'features/progression/progression.slice';
import { selectDetectedNote } from 'features/pitch/pitch.slice';

import Fretboard from 'components/Fretboard';

function ScaleVisualizer(): JSX.Element {
    const scale = useSelector(selectScale);
    const detectedNote = useSelector(selectDetectedNote);

    return (
        <Fretboard
            selectedNotes={scale.notes}
            highlightedNotes={[
                { note: detectedNote?.name, highlightColor: 'highlight2' },
                { note: scale.tonic, highlightColor: 'highlight1' },
            ]}
        />
    );
}

export default ScaleVisualizer;
