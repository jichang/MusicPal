import {
  Dynamics,
  Measure,
  Note,
  NoteName,
  UniformTempo,
  VaryingTempo,
} from './theory';

export const UNIFORM_BPM_60: UniformTempo = {
  type: 'uniform',
  speed: 60,
};

export const VARYING_BPM_60: VaryingTempo = {
  type: 'varying',
  begin: 60,
  end: 60,
  step: 10,
};

export const DEFAULT_BEAT_ACCENT_NOTE: Note = {
  name: NoteName.A,
  octave: 4,
  dynamics: Dynamics.Accent,
};

export const DEFAULT_BEAT_LIGHT_NOTE: Note = {
  name: NoteName.A,
  octave: 4,
  dynamics: Dynamics.Light,
};

export const DEFAULT_MEASURES: Measure[] = [
  {
    repeat: 1,
    beats: [
      {
        notes: [DEFAULT_BEAT_ACCENT_NOTE],
      },
      {
        notes: [DEFAULT_BEAT_LIGHT_NOTE],
      },
      {
        notes: [DEFAULT_BEAT_LIGHT_NOTE],
      },
      {
        notes: [DEFAULT_BEAT_LIGHT_NOTE],
      },
      {
        notes: [DEFAULT_BEAT_ACCENT_NOTE],
      },
      {
        notes: [DEFAULT_BEAT_LIGHT_NOTE],
      },
      {
        notes: [DEFAULT_BEAT_LIGHT_NOTE],
      },
      {
        notes: [DEFAULT_BEAT_LIGHT_NOTE],
      },
    ],
  },
];

export const NOTE_A4: Note = {
  name: NoteName.A,
  octave: 4,
  dynamics: Dynamics.None,
};

export const CONCERT_PITCH = 440; // A4

export function stringifyNoteName(noteName: NoteName) {
  switch (noteName) {
    case NoteName.C:
      return 'C';
    case NoteName.CSharp:
      return 'C#';
    case NoteName.D:
      return 'D';
    case NoteName.DSharp:
      return 'D#';
    case NoteName.E:
      return 'E';
    case NoteName.F:
      return 'F';
    case NoteName.FSharp:
      return 'F#';
    case NoteName.G:
      return 'G';
    case NoteName.GSharp:
      return 'G#';
    case NoteName.A:
      return 'A';
    case NoteName.ASharp:
      return 'A#';
    case NoteName.B:
      return 'B';
  }
}

export function stringifyNote(note: Note) {
  return `${stringifyNoteName(note.name)}${note.octave}`;
}

export function getInterval(noteA: Note, noteB: Note) {
  return 12 * (noteA.octave - noteB.octave) + (noteA.name - noteB.name);
}

export function getNoteFrequency(note: Note) {
  const halfSteps = getInterval(note, NOTE_A4);

  return Math.pow(2, halfSteps / 12) * CONCERT_PITCH;
}

export function getNoteFromFrequency(frequency: number, dynamics: Dynamics) {
  const halfSteps =
    Math.round((Math.log(frequency / CONCERT_PITCH) * 12) / Math.log(2)) -
    (NoteName.C - NoteName.A);

  const octave = Math.floor(halfSteps / 12) + NOTE_A4.octave;
  const name = (halfSteps - (octave - NOTE_A4.octave) * 12) % (NoteName.B + 1);

  return {
    name,
    octave,
    dynamics,
  };
}

// Based on ACF2+ algorithm
export function detectPitch(audioBuffer: Float32Array, sampleRate: number) {
  const audioSize = audioBuffer.length;
  let rms = 0;

  for (let i = 0; i < audioSize; i++) {
    let val = audioBuffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / audioSize);
  if (rms < 0.01) {
    return -1;
  }

  let startIndex = 0;
  let endIndex = audioSize - 1;
  let threshold = 0.2;
  for (let i = 0; i < audioSize / 2; i++) {
    if (Math.abs(audioBuffer[i]) < threshold) {
      startIndex = i;
      break;
    }
  }

  for (let i = 1; i < audioSize / 2; i++) {
    if (Math.abs(audioBuffer[audioSize - i]) < threshold) {
      endIndex = audioSize - i;
      break;
    }
  }

  const audioSlice = audioBuffer.slice(startIndex, endIndex);
  const sliceSize = audioSlice.length;

  let c = new Array(sliceSize).fill(0);
  for (let i = 0; i < sliceSize; i++) {
    for (let j = 0; j < sliceSize - i; j++) {
      c[i] = c[i] + audioSlice[j] * audioSlice[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) {
    d++;
  }
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < sliceSize; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;

  let x1 = c[T0 - 1];
  let x2 = c[T0];
  let x3 = c[T0 + 1];
  let a = (x1 + x3 - 2 * x2) / 2;
  let b = (x3 - x1) / 2;
  if (a) {
    T0 = T0 - b / (2 * a);
  }

  return sampleRate / T0;
}
