export const getStringYPosition = (stringCount: number, stringNo: number): number =>
    (100 * stringNo) / (stringCount - 1);
export const getFretXPosition = (fretCount: number, fretNo: number): number => (100 * fretNo) / (fretCount - 1);

export const getNoteXYPosition = (
    stringNo: number,
    stringCount: number,
    fretNo: number,
    fretCount: number
): [number, number] => {
    const y = getStringYPosition(stringCount, stringNo);
    const x = (getFretXPosition(fretCount, fretNo) + getFretXPosition(fretCount, fretNo + 1)) / 2;
    return [x, y];
};

export const getInlayXYPosition = (fretNo: number, fretCount: number): [number, number] => {
    const y = 110; // TODO: fix
    const x = (getFretXPosition(fretCount, fretNo) + getFretXPosition(fretCount, fretNo + 1)) / 2;
    return [x, y];
};
