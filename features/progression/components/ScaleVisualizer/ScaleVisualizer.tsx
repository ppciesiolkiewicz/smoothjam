import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, FormControlLabel } from '@material-ui/core';
import { selectScale } from 'features/progression/progression.slice';
import { selectDetectedNote } from 'features/pitch/pitch.slice';

import Fretboard from 'components/Fretboard';

function ScaleVisualizer(): JSX.Element {
    const [withIntervals, setWithIntervals] = useState(false);
    const scale = useSelector(selectScale);
    const detectedNote = useSelector(selectDetectedNote);

    const handleChange = () => {
        setWithIntervals(!withIntervals);
    };

    return (
        <div>
            <FormControlLabel
                control={
                    <Switch checked={withIntervals} onChange={handleChange} name="withIntervals" color="primary" />
                }
                label="Show intervals"
            />
            <Fretboard
                selectedNotes={scale.notes}
                intervals={withIntervals ? scale.intervals : undefined}
                highlightedNotes={[
                    { note: detectedNote?.name, highlightColor: 'highlight2' },
                    { note: scale.tonic, highlightColor: 'highlight1' },
                ]}
            />
        </div>
    );
}

export default ScaleVisualizer;
