import guitar from './guitar.json';

export const guitarChords = {
    ...guitar,
    keys: [...guitar.keys, 'D#', 'G#', 'A#', 'Dd', 'Gb'],
    chords: {
        ...guitar.chords,
        'D#': guitar.chords['Eb'].map(c => ({
            ...c,
            key: 'D#',
        })),
        'G#': guitar.chords['Ab'].map(c => ({
            ...c,
            key: 'G#',
        })),
        'A#': guitar.chords['Bb'].map(c => ({
            ...c,
            key: 'A#',
        })),
        Db: guitar.chords['Bb'].map(c => ({
            ...c,
            key: 'Db',
        })),
        Gb: guitar.chords['Csharp'].map(c => ({
            ...c,
            key: 'Gb',
        })),
        'C#': guitar.chords['Csharp'],
        'F#': guitar.chords['Fsharp'],
        Csharp: undefined,
        Fsharp: undefined,
    },
};
