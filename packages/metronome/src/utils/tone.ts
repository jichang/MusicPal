import { Dynamics, Note, Rhythm } from '@musicpal/music';

export const frequencies: Record<Dynamics, number> = {
  [Dynamics.Accent]: 1000,
  [Dynamics.Light]: 500,
  [Dynamics.None]: 0,
  [Dynamics.Invalid]: 0,
};

export function scheduleNote(
  audioContext: AudioContext,
  time: number,
  note: Note,
) {
  const osc = audioContext.createOscillator();
  const envelope = audioContext.createGain();

  osc.frequency.value = frequencies[note.dynamics];
  envelope.gain.value = 1;
  envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
  envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

  osc.connect(envelope);
  envelope.connect(audioContext.destination);

  osc.start(time);
  osc.stop(time + 0.03);
}

export function scheduleFirstBeat(
  audioContext: AudioContext,
  rhythm: Rhythm,
  startTime: number,
  beatInterval: number,
) {
  return scheduleBeat(audioContext, rhythm, startTime, 0, 0, 0, beatInterval);
}

export function scheduleBeat(
  audioContext: AudioContext,
  rhythm: Rhythm,
  startTime: number,
  measureIndex: number,
  beatIndex: number,
  beatOffset: number,
  beatInterval: number,
) {
  const measure = rhythm.measures[measureIndex];
  if (!measure) {
    return;
  }

  const beat = measure.beats[beatIndex];
  if (!beat) {
    return;
  }

  const beatStartTime = startTime + beatInterval * beatOffset;
  const noteInterval = beatInterval / beat.notes.length;

  for (let i = 0; i < beat.notes.length; i++) {
    const note = beat.notes[i];
    const time = beatStartTime + noteInterval * i;
    scheduleNote(audioContext, time, note);
  }
}
