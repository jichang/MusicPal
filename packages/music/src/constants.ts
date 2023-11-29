import {
  Dynamics,
  Measure,
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

export const DEFAULT_MEASURES: Measure[] = [
  {
    repeat: 1,
    beats: [
      {
        notes: [
          {
            dynamics: Dynamics.Accent,
          },
        ],
      },
      {
        notes: [
          {
            dynamics: Dynamics.Light,
          },
        ],
      },
      {
        notes: [
          {
            dynamics: Dynamics.Light,
          },
        ],
      },
      {
        notes: [
          {
            dynamics: Dynamics.Light,
          },
        ],
      },
      {
        notes: [
          {
            dynamics: Dynamics.Accent,
          },
        ],
      },
      {
        notes: [
          {
            dynamics: Dynamics.Light,
          },
        ],
      },
      {
        notes: [
          {
            dynamics: Dynamics.Light,
          },
        ],
      },
      {
        notes: [
          {
            dynamics: Dynamics.Light,
          },
        ],
      },
    ],
  },
];
