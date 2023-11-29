import { Dynamics, Note, NoteName } from '@musicpal/music';

export interface NoteOptions {
  octaveRange: {
    min: number;
    max: number;
  };
}

export function generateRandomNote(
  options: NoteOptions = { octaveRange: { min: 0, max: 8 } },
): Note {
  const { octaveRange } = options;
  const name = (Math.floor(Math.random() * 100) % (NoteName.B + 1)) as NoteName;
  const octave =
    (Math.floor(Math.random() * 100) % (octaveRange.max - octaveRange.min)) +
    octaveRange.min;

  return {
    name,
    octave,
    dynamics: Dynamics.Accent,
  };
}
