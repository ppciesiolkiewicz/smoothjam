import React from 'react';
import { useAppSelector, useAppDispatch } from 'store';
import {
    setSelectedKeyTonic,
    setSelectedKeyType,
    selectSelectedKeyTonic,
    selectSelectedKeyType,
    selectAvailableKeys,
} from 'features/progression/progression.slice';
import { Box, InputLabel, TextField, NoSsr } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

function KeySelector(): JSX.Element {
    const dispatch = useAppDispatch();
    const handleKeyTonicChange = (_, newValue) => dispatch(setSelectedKeyTonic(newValue));
    const handleKeyTypeChange = (_, newValue) => dispatch(setSelectedKeyType(newValue));

    const keyTonic = useAppSelector(selectSelectedKeyTonic);
    const keyType = useAppSelector(selectSelectedKeyType);

    const availableKeyTonics = useAppSelector(selectAvailableKeys);
    const availableKeyTypes = useAppSelector(state => state.progression.availableKeyTypes);

    return (
        <Box>
            <InputLabel id="key-select-label">Key</InputLabel>
            <NoSsr>
                <Box display="flex" flexDirection="row" mt={2}>
                    <Autocomplete
                        id="key-type-tonic"
                        options={availableKeyTonics}
                        disableClearable
                        openOnFocus
                        blurOnSelect
                        clearOnBlur
                        value={keyTonic}
                        onChange={handleKeyTonicChange}
                        getOptionLabel={option => option}
                        style={{ width: 300 }}
                        renderInput={params => <TextField {...params} label="Key" variant="outlined" />}
                    />
                    <Autocomplete
                        id="key-type-select"
                        options={availableKeyTypes}
                        disableClearable
                        openOnFocus
                        blurOnSelect
                        value={keyType}
                        onChange={handleKeyTypeChange}
                        getOptionLabel={option => option}
                        style={{ width: 300 }}
                        renderInput={params => <TextField {...params} label="Key type" variant="outlined" />}
                    />
                </Box>
            </NoSsr>
        </Box>
    );
}

export default KeySelector;
