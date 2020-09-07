import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { PitchDetector as PD } from 'pitchy';
import { setDetectedPitch } from 'features/pitch/pitch.slice';

function PitchDetector({ clarityThreshold, analyserMinDecibels, analyserMaxDecibels, analyserSmoothingTimeConstant }) {
    const dispatch = useDispatch();

    const updatePitch = useCallback(
        (analyserNode, detector, input, sampleRate) => {
            analyserNode.getFloatTimeDomainData(input);
            let [pitch, clarity] = detector.findPitch(input, sampleRate);

            window.requestAnimationFrame(() =>
                updatePitch(analyserNode, detector, input, sampleRate, setDetectedPitch)
            );
            if (clarity > clarityThreshold) {
                dispatch(setDetectedPitch(pitch));
                return;
            }
        },
        [clarityThreshold, dispatch]
    );

    useEffect(() => {
        const hasGetUserMedia = !!(
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );
        if (!hasGetUserMedia) {
            alert('Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.');
            return;
        }

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyserNode = audioContext.createAnalyser();
        analyserNode.minDecibels = analyserMinDecibels;
        analyserNode.maxDecibels = analyserMaxDecibels;
        analyserNode.smoothingTimeConstant = analyserSmoothingTimeConstant;

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            let sourceNode = audioContext.createMediaStreamSource(stream);
            sourceNode.connect(analyserNode);
            const detector = PD.forFloat32Array(analyserNode.fftSize);
            const input = new Float32Array(detector.inputLength);
            updatePitch(analyserNode, detector, input, audioContext.sampleRate);
        });
    }, [analyserMaxDecibels, analyserMinDecibels, analyserSmoothingTimeConstant, updatePitch]);

    return null;
}

PitchDetector.propTypes = {
    clarityThreshold: PropTypes.number.isRequired,
    analyserMinDecibels: PropTypes.number.isRequired,
    analyserMaxDecibels: PropTypes.number.isRequired,
    analyserSmoothingTimeConstant: PropTypes.number.isRequired,
};

PitchDetector.defaultProps = {
    clarityThreshold: 0.98,
    analyserMinDecibels: -35,
    analyserMaxDecibels: -10,
    analyserSmoothingTimeConstant: 0.85,
};

export default PitchDetector;
