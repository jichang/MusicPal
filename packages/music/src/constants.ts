import {
  Dynamics,
  Measure,
  Rhythm,
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

export const SINGLE_RHYTHM: Rhythm = {
  id: '0',
  name: 'single',
  category: 'default',
  order: 0,
  tempo: UNIFORM_BPM_60,
  measures: [
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
      ],
    },
  ],
};

export const DUPLETS_RHYTHM: Rhythm = {
  id: '1',
  name: 'duplets',
  category: 'default',
  order: 1,
  tempo: UNIFORM_BPM_60,
  measures: [
    {
      repeat: 1,
      beats: [
        {
          notes: [
            {
              dynamics: Dynamics.Accent,
            },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Accent,
            },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Accent,
            },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Accent,
            },
            { dynamics: Dynamics.Light },
          ],
        },
      ],
    },
  ],
};

export const TRIPLETS_RHYTHM: Rhythm = {
  id: '2',
  name: 'triplets',
  category: 'default',
  order: 1,
  tempo: UNIFORM_BPM_60,
  measures: [
    {
      repeat: 1,
      beats: [
        {
          notes: [
            {
              dynamics: Dynamics.Accent,
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Accent,
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Accent,
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Accent,
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
          ],
        },
      ],
    },
  ],
};
