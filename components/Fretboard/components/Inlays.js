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

function Inlays({ fretCount }) {
    return INLAYS_FRETS.map(fretNo => {
        if (fretNo >= fretCount) { // TOOD: fix
            return null;
        }
        const [x, y] = getInlayXYPosition(fretNo, fretCount);
        return <Circle cx={`${x}%`} cy={`${y}%`} r="5" />;
    });
}

export default Inlays;
