import noop from 'lodash.noop';

enum NOTE_RESOLUTION {
    NOTE_16TH = 0,
    NOTE_8TH = 1,
    NOTE_4TH = 2,
}

class Metronome {
    static startDelta = 0.1;
    static scheduleAheadTime = 0.1;
    static lookahead = 25.0;

    audioContext: AudioContext;
    timerWorker: Worker;
    isPlaying: boolean;
    bpm: number;
    noteResolution: NOTE_RESOLUTION;
    nextNoteStartTime: number;
    current16thNote: number;
    tickCallback: () => void;

    constructor(tickCallback: () => void, bpm: number) {
        if (!window.AudioContext) {
            throw new Error('AudioContext not supported');
        }

        this.audioContext = new AudioContext();
        this.timerWorker = this.createTimerWorker();
        this.isPlaying = false;
        this.bpm = bpm;
        this.noteResolution = NOTE_RESOLUTION.NOTE_4TH;
        this.nextNoteStartTime = 0;
        this.current16thNote = 0;
        this.tickCallback = tickCallback || noop;
    }

    get currentBeat(): number {
        const RESOLUTION_MAP = {
            [NOTE_RESOLUTION.NOTE_16TH]: 1,
            [NOTE_RESOLUTION.NOTE_8TH]: 2,
            [NOTE_RESOLUTION.NOTE_4TH]: 4,
        };
        return this.current16thNote / RESOLUTION_MAP[this.noteResolution];
    }

    createTimerWorker(): Worker {
        const metronomeWorkerString = `
      let timerID=null;
      let interval=100;
    
      self.onmessage=function(e){
        if (e.data=='start') {
          timerID=setInterval(function(){postMessage('tick');},interval)
        } else if (e.data.interval) {
          interval=e.data.interval;
          if (timerID) {
            clearInterval(timerID);
            timerID=setInterval(function(){postMessage('tick');},interval)
          }
        } else if (e.data=='stop') {
          clearInterval(timerID);
          timerID=null;
        }
      };
    `;

        const metronomeWorker = window.URL.createObjectURL(
            new Blob([metronomeWorkerString], {
                type: 'text/javascript',
            })
        );

        const worker = new Worker(metronomeWorker);
        worker.onmessage = e => {
            if (e.data === 'tick') {
                this.schedule();
            } else {
                console.log('Worker received message: ' + e.data);
            }
        };
        worker.postMessage({ interval: Metronome.lookahead });

        return worker;
    }

    schedule(): void {
        while (this.nextNoteStartTime < this.audioContext.currentTime + Metronome.scheduleAheadTime) {
            this.scheduleNote();
            this.nextNote();
        }
    }

    scheduleNote(): void {
        if (this.noteResolution === NOTE_RESOLUTION.NOTE_8TH && this.current16thNote % 2) {
            return;
        }
        if (this.noteResolution === NOTE_RESOLUTION.NOTE_4TH && this.current16thNote % 4) {
            return;
        }
        this.tickCallback();

        const oscillator = this.audioContext.createOscillator();
        oscillator.connect(this.audioContext.destination);

        if (this.current16thNote % 16 === 0) {
            oscillator.frequency.value = 880.0;
        } else if (this.current16thNote % 4 === 0) {
            oscillator.frequency.value = 440.0;
        } else {
            oscillator.frequency.value = 220.0;
        }

        const noteLength = 0.05;
        oscillator.start(this.nextNoteStartTime);
        oscillator.stop(this.nextNoteStartTime + noteLength);
    }

    nextNote(): void {
        const _60_SECONDS = 60.0;
        const secondsPerBeat = _60_SECONDS / this.bpm;
        this.nextNoteStartTime += 0.25 * secondsPerBeat;

        this.current16thNote++;
    }

    toggleStart(): void {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.current16thNote = 0;
            this.nextNoteStartTime = this.audioContext.currentTime + Metronome.startDelta;
            this.timerWorker.postMessage('start');
        } else {
            this.timerWorker.postMessage('stop');
            this.current16thNote = -1;
            this.tickCallback();
        }
    }
}

export default Metronome;
