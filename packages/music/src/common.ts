import { Dynamics, Measure, Note, NoteName, UniformTempo, VaryingTempo } from './theory';

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
  dynamics: Dynamics.Accent
}

export const DEFAULT_BEAT_LIGHT_NOTE: Note = {
  name: NoteName.A,
  octave: 4,
  dynamics: Dynamics.Light
}

export const DEFAULT_MEASURES: Measure[] = [
  {
    repeat: 1,
    beats: [
      {
        notes: [
          DEFAULT_BEAT_ACCENT_NOTE
        ],
      },
      {
        notes: [
          DEFAULT_BEAT_LIGHT_NOTE
        ],
      },
      {
        notes: [
          DEFAULT_BEAT_LIGHT_NOTE,
        ],
      },
      {
        notes: [
          DEFAULT_BEAT_LIGHT_NOTE,
        ],
      },
      {
        notes: [
          DEFAULT_BEAT_ACCENT_NOTE,
        ],
      },
      {
        notes: [
          DEFAULT_BEAT_LIGHT_NOTE,
        ],
      },
      {
        notes: [
          DEFAULT_BEAT_LIGHT_NOTE,
        ],
      },
      {
        notes: [
          DEFAULT_BEAT_LIGHT_NOTE,
        ],
      },
    ],
  },
];

export const NOTE_A4: Note = {
  name: NoteName.A,
  octave: 4,
  dynamics: Dynamics.None,
}

export const CONCERT_PITCH = 440; // A4

export function getNoteName(note: Note) {
  switch (note.name) {
    case NoteName.C:
      return "C";
    case NoteName.CSharp:
      return "C#";
    case NoteName.D:
      return "D";
    case NoteName.DSharp:
      return "D#";
    case NoteName.E:
      return "E";
    case NoteName.F:
      return "F";
    case NoteName.FSharp:
      return "F#";
    case NoteName.G:
      return "G";
    case NoteName.GSharp:
      return "G#";
    case NoteName.A:
      return "A";
    case NoteName.ASharp:
      return "A#";
    case NoteName.B:
      return "B";
  }
}

export function stringifyNote(note: Note) {
  return `${getNoteName(note)}${note.octave}`;
}

export function getNoteFrenquency(note: Note) {
  const halfSteps = 12 * (note.octave - NOTE_A4.octave) + (note.name - NoteName.A);

  return Math.pow(2, halfSteps / 12) * CONCERT_PITCH;
}
