import { Dynamics, Note, NoteName } from '@musicpal/music';

export interface Instrument {
  name: string;
  notes: Note[];
}

const guitar: Instrument = {
  name: 'guitar',
  notes: [
    {
      name: NoteName.E,
      octave: 2,
      dynamics: Dynamics.Light,
    },
    {
      name: NoteName.A,
      octave: 2,
      dynamics: Dynamics.Light,
    },
    {
      name: NoteName.D,
      octave: 3,
      dynamics: Dynamics.Light,
    },
    {
      name: NoteName.G,
      octave: 3,
      dynamics: Dynamics.Light,
    },
    {
      name: NoteName.B,
      octave: 3,
      dynamics: Dynamics.Light,
    },
    {
      name: NoteName.E,
      octave: 4,
      dynamics: Dynamics.Light,
    },
  ],
};

const bass: Instrument = {
  name: 'bass',
  notes: [
    {
      name: NoteName.E,
      octave: 1,
      dynamics: Dynamics.Light,
    },
    {
      name: NoteName.A,
      octave: 1,
      dynamics: Dynamics.Light,
    },
    {
      name: NoteName.D,
      octave: 2,
      dynamics: Dynamics.Light,
    },
    {
      name: NoteName.G,
      octave: 2,
      dynamics: Dynamics.Light,
    },
  ],
};

export const instruments: Instrument[] = [guitar, bass];
