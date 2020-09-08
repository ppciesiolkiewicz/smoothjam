import React from 'react';
import { useAppSelector, useAppDispatch } from 'store';
import {
    setSelectedKeyTonic,
    setSelectedKeyType,
    selectSelectedKeyTonic,
    selectSelectedKeyType,
    selectAvailableKeys,
} from 'features/progression/progression.slice';
import { Box, Select, MenuItem, InputLabel } from '@material-ui/core';

function Controls() {
    const dispatch = useAppDispatch();
    const handleKeyTonicChange = e => dispatch(setSelectedKeyTonic(e.target.value));
    const handleKeyTypeChange = e => dispatch(setSelectedKeyType(e.target.value));

    const keyTonic = useAppSelector(selectSelectedKeyTonic);
    const keyType = useAppSelector(selectSelectedKeyType);

    const availableKeyTonics = useAppSelector(selectAvailableKeys);
    const availableKeyTypes = useAppSelector(state => state.progression.availableKeyTypes);

    return (
        <Box>
            <InputLabel id="key-select-label">Key</InputLabel>

            <Select labelId="key-select-label" value={keyTonic} onChange={handleKeyTonicChange}>
                {availableKeyTonics.map(k => (
                    <MenuItem key={k} value={k}>
                        {k}
                    </MenuItem>
                ))}
            </Select>
            <Select value={keyType} onChange={handleKeyTypeChange}>
                {availableKeyTypes.map((t, index) => (
                    <MenuItem key={index} value={t}>
                        {t}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}

export default Controls;
