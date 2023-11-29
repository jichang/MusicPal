import { CONCERT_PITCH, Dynamics, Note, Rhythm } from '@musicpal/music';

export const gains: Record<Dynamics, number> = {
  [Dynamics.Accent]: 0.75,
  [Dynamics.Light]: 1,
  [Dynamics.None]: 0,
  [Dynamics.Invalid]: 0,
};

export function scheduleNote(
  audioContext: AudioContext,
  time: number,
  note: Note,
) {
  const osc = audioContext.createOscillator();
  osc.frequency.value = CONCERT_PITCH;

  const envelope = audioContext.createGain();
  envelope.gain.value = gains[note.dynamics];
  envelope.gain.exponentialRampToValueAtTime(1, time);
  envelope.gain.exponentialRampToValueAtTime(0.000001, time + 0.03);

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
