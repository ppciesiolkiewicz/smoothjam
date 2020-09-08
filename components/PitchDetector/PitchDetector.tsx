import { useEffect, useCallback } from 'react';
import { useAppDispatch } from 'store';
import { PitchDetector as PD } from 'pitchy';
import { setDetectedPitch } from 'features/pitch/pitch.slice';

type PitchDetectorProps = {
    clarityThreshold: number;
    analyserMinDecibels: number;
    analyserMaxDecibels: number;
    analyserSmoothingTimeConstant: number;
};

function PitchDetector({
    clarityThreshold,
    analyserMinDecibels,
    analyserMaxDecibels,
    analyserSmoothingTimeConstant,
}: PitchDetectorProps): null {
    const dispatch = useAppDispatch();

    const updatePitch = useCallback(
        (analyserNode, detector, input, sampleRate) => {
            analyserNode.getFloatTimeDomainData(input);
            const [pitch, clarity] = detector.findPitch(input, sampleRate);

            window.requestAnimationFrame(() => updatePitch(analyserNode, detector, input, sampleRate));
            if (clarity > clarityThreshold) {
                dispatch(setDetectedPitch(pitch));
                return;
            }
        },
        [clarityThreshold, dispatch]
    );

    useEffect(() => {
        if (!navigator.getUserMedia) {
            alert('Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.');
            return;
        }

        const audioContext = new window.AudioContext();
        const analyserNode = audioContext.createAnalyser();
        analyserNode.minDecibels = analyserMinDecibels;
        analyserNode.maxDecibels = analyserMaxDecibels;
        analyserNode.smoothingTimeConstant = analyserSmoothingTimeConstant;

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const sourceNode = audioContext.createMediaStreamSource(stream);
            sourceNode.connect(analyserNode);
            const detector = PD.forFloat32Array(analyserNode.fftSize);
            const input = new Float32Array(detector.inputLength);
            updatePitch(analyserNode, detector, input, audioContext.sampleRate);
        });
    }, [analyserMaxDecibels, analyserMinDecibels, analyserSmoothingTimeConstant, updatePitch]);

    return null;
}

PitchDetector.defaultProps = {
    clarityThreshold: 0.98,
    analyserMinDecibels: -35,
    analyserMaxDecibels: -10,
    analyserSmoothingTimeConstant: 0.85,
};

export default PitchDetector;
