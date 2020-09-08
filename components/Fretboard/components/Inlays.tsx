import React from 'react';
import styled from 'styled-components';
import { getInlayXYPosition } from '../utils';

const Circle = styled.circle`
    ${({ theme: { inlayColor } }) => `
        stroke: ${inlayColor};
        fill: ${inlayColor};
    `}
`;

const INLAYS_FRETS = [3, 5, 7, 10, 12];

type InlaysProps = {
    fretCount: Number,
}

function Inlays({ fretCount }: InlaysProps) {
    const inlays = INLAYS_FRETS.map(fretNo => {
        if (fretNo >= fretCount) {
            // TOOD: fix
            return null;
        }
        const [x, y] = getInlayXYPosition(fretNo, fretCount);
        return <Circle key={fretNo} cx={`${x}%`} cy={`${y}%`} r="5" />;
    });

    return <g>{inlays}</g>;
}

export default Inlays;
