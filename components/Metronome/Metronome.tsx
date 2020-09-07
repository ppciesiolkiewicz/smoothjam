import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBeat, selectIsPlaying, selectBpm } from 'features/metronome/metronome.slice';
import Metronome from 'utils/Metronome';

// class MetronomeComponent extends Component {
//     componentDidMount() {
//         const { setCurrentBeat } = this.props;
//         this.metronome = new Metronome(() => {
//             setCurrentBeat(this.metronome.currentBeat);
//         });
//     }

//     componentDidUpdate(prevProps) {
//         const { isPlaying, bpm } = this.props;
//         const { isPlaying: prevIsPlaying, bpm: prevBpm } = prevProps;

//         if (isPlaying !== prevIsPlaying) {
//             this.metronome.toggleStart();
//         } else if (bpm !== prevBpm) {
//             this.metronome.bpm = bpm;
//         }
//     }

//     render() {
//         return null;
//     }
// }

// const mapStateToProps = ({ metronome: { isPlaying, bpm } }) => ({
//     isPlaying,
//     bpm,
// });


function Metronome() {
    const dispatch = useDispatch();
    const isPlaying = useSelector(selectIsPlaying);
    const bpm = useSelector(selectBpm);

    useEffect(() => {
        this.metronome = new Metronome(() => {
            setCurrentBeat(this.metronome.currentBeat);
        });  
    });


    return null;
}

// export default connect(mapStateToProps, { setCurrentBeat })(MetronomeComponent);

export default Metronome;