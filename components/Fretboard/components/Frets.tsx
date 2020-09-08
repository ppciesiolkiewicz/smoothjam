import React from 'react';
import styled from 'styled-components';
import times from 'lodash.times';
import { getFretXPosition } from '../utils';

const Rect = styled.rect`
    ${({ theme: { fretColor } }) => `
        stroke: ${fretColor};
        fill: ${fretColor};
    `}
`;

type FretProps = {
    fretNo: number;
    fretCount: number;
};

function Fret({ fretCount, fretNo }: FretProps): JSX.Element {
    const xPos = getFretXPosition(fretCount, fretNo);
    const x = `${xPos}%`;

    if (fretNo === 0) {
        return null;
    }

    if (fretNo === 1) {
        return <Rect x={`calc(${x} - 15px)`} y="0" width="15" height="100%" />;
    }

    return <Rect x={x} y="0" width="0.5" height="100%" />;
}

type FretsProps = {
    fretCount: number;
};

function Frets({ fretCount }: FretsProps): JSX.Element {
    return times(fretCount, i => <Fret key={i} fretCount={fretCount} fretNo={i} />);
}

export default Frets;
