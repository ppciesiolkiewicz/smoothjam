import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Select, MenuItem, InputLabel } from '@material-ui/core';
import { availableProgressions, initialProgressionIndex } from 'features/progression/constants';
import { setSelectedProgression, selectSelectedKeyType } from 'features/progression/progression.slice';

function ProgressionSelector(): JSX.Element {
    const dispatch = useDispatch();
    const selectedKeyType = useSelector(selectSelectedKeyType);
    const [selectedProgressionIndex, setSelectedProgressionIndex] = useState(initialProgressionIndex);
    const progressionsInKeyType = availableProgressions[selectedKeyType] || [];

    useEffect(() => {
        const newIndex = 0;
        setSelectedProgressionIndex(newIndex);
        dispatch(setSelectedProgression(progressionsInKeyType[newIndex]));
    }, [selectedKeyType]);

    const handleProgressionIndexChange = e => {
        setSelectedProgressionIndex(e.target.value);
        dispatch(setSelectedProgression(progressionsInKeyType[selectedProgressionIndex]));
    };

    return (
        <Box>
            <InputLabel id="progression-select-label">Progression</InputLabel>
            <Select
                labelId="progression-select-label"
                value={selectedProgressionIndex}
                onChange={handleProgressionIndexChange}
            >
                {progressionsInKeyType.map((p, index) => (
                    <MenuItem key={index} value={index}>
                        {p.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}

export default ProgressionSelector;
