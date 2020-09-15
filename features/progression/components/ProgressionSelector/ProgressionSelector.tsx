import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setSelectedProgressionIndex,
    selectAvailableProgressions,
    selectSelectedProgressionIndexIndex,
} from 'features/progression/progression.slice';
import { Box, Select, MenuItem, InputLabel } from '@material-ui/core';

function ProgressionSelector(): JSX.Element {
    const dispatch = useDispatch();
    const handleProgressionIndexChange = e => dispatch(setSelectedProgressionIndex(e.target.value));

    const availableProgressions = useSelector(selectAvailableProgressions);
    const selectedProgressionIndex = useSelector(selectSelectedProgressionIndexIndex);

    return (
        <Box>
            <InputLabel id="progression-select-label">Progression</InputLabel>
            <Select
                labelId="progression-select-label"
                value={selectedProgressionIndex}
                onChange={handleProgressionIndexChange}
            >
                {availableProgressions.map((p, index) => (
                    <MenuItem key={index} value={index}>
                        {p.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}

export default ProgressionSelector;
