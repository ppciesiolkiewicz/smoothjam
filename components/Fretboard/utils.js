export const getStringYPosition = (stringCount, stringNo) => (100 * stringNo) / (stringCount - 1);
export const getFretXPosition = (fretCount, fretNo) => (100 * fretNo) / (fretCount - 1);

export const getNoteXYPosition = (stringNo, stringCount, fretNo, fretCount) => {
    const y = getStringYPosition(stringCount, stringNo);
    const x = (getFretXPosition(fretCount, fretNo) + getFretXPosition(fretCount, fretNo + 1)) / 2;
    return [x, y];
};

export const getInlayXYPosition = (fretNo, fretCount) => {
    const y = 110; // TODO: fix
    const x = (getFretXPosition(fretCount, fretNo) + getFretXPosition(fretCount, fretNo + 1)) / 2;
    return [x, y];
};
