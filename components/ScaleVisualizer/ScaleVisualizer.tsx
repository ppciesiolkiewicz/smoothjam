import React from 'react';
import { useSelector } from 'react-redux';
import { selectScale } from 'features/progression/progression.slice';
import Fretboard from 'components/Fretboard';

function ScaleVisualizer() {
    const scale = useSelector(selectScale);
    const detectedNote = useSelector(state => state.pitch.note);

    return (
        <Fretboard
            selectedNotes={scale.notes}
            highlightedNotes={[
                { note: detectedNote, highlightColor: 'highlight2' },
                { note: scale.tonic, highlightColor: 'highlight1' },
            ]}
        />
    );
}

export default ScaleVisualizer;
