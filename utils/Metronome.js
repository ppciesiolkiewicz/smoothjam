export const NOTE_RESOLUTION_16TH_NOTE = 0;
export const NOTE_RESOLUTION_8TH_NOTE = 1;
export const NOTE_RESOLUTION_4TH_NOTE = 2;

class Metronome {
    static startDelta = 0.1;
    static scheduleAheadTime = 0.1;
    static lookahead = 25.0;

    constructor(tickCallback, bpm) {
        if (!window.AudioContext) {
            throw new Error('AudioContext not supported');
        }

        this.audioContext = new AudioContext();
        this.timerWorker = this.createTimerWorker();

        this.isPlaying = false;
        this.bpm = bpm;
        this.noteResolution = NOTE_RESOLUTION_4TH_NOTE;
        this.nextNoteStartTime = 0;
        this.current16thNote = 0;
        this.tickCallback = tickCallback || (() => {});
    }

    get currentBeat() {
        const RESOLUTION_MAP = {
            0: 1,
            1: 2,
            2: 4,
        };
        return this.current16thNote / RESOLUTION_MAP[this.noteResolution];
    }

    createTimerWorker() {
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

    schedule() {
        while (this.nextNoteStartTime < this.audioContext.currentTime + Metronome.scheduleAheadTime) {
            this.scheduleNote();
            this.nextNote();
        }
    }

    scheduleNote() {
        if (this.noteResolution === NOTE_RESOLUTION_8TH_NOTE && this.current16thNote % 2) {
            return;
        }
        if (this.noteResolution === NOTE_RESOLUTION_4TH_NOTE && this.current16thNote % 4) {
            return;
        }

        this.tickCallback(this);

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

    nextNote() {
        const _60_SECONDS = 60.0;
        const secondsPerBeat = _60_SECONDS / this.bpm;
        this.nextNoteStartTime += 0.25 * secondsPerBeat;

        this.current16thNote++;
    }

    toggleStart() {
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
