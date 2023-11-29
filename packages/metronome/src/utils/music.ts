import { lcm } from "./math";

export enum Dynamics {
  None = 0,
  Light,
  Strong,
}

export interface Note {
  dynamics: Dynamics;
}

export function cloneNote(note: Note): Note {
  return {
    ...note
  }
}

export interface Beat {
  notes: Note[];
}

export function cloneBeat(beat: Beat): Beat {
  return {
    notes: beat.notes.map(note => {
      return {
        ...note
      }
    })
  }
}

export interface Measure {
  repeat: number;
  beats: Beat[];
}

export function cloneMeasure(measure: Measure): Measure {
  return {
    repeat: measure.repeat,
    beats: measure.beats.map(cloneBeat)
  }
}

export interface Rhythm {
  id: string;
  category: 'default' | 'personal';
  name: string;
  order: number;
  measures: Measure[];
}

export function parseRhythm(rhythm: Pick<Rhythm, "measures">) {
  let measureCount = 0;
  let beatCount = 0;
  let noteCount = 0;
  let ticksPerBeat = 1;

  for (const measure of rhythm.measures) {
    for (let measureOffset = 0; measureOffset < measure.repeat; measureOffset++) {
      measureCount = measureCount + 1;

      for (const beat of measure.beats) {
        beatCount = beatCount + 1;

        noteCount = noteCount + beat.notes.length;

        ticksPerBeat = lcm(ticksPerBeat, beat.notes.length);
      }
    }
  }

  return {
    measureCount,
    beatCount,
    noteCount,
    ticksPerBeat
  }
}

export function locate(rhythm: Pick<Rhythm, "measures">, ticksPerBeat: number, currTick: number) {
  let currMeasureIndex = 0;
  let currMeasureOffset = 0;
  let currBeatIndex = 0;
  let currNoteIndex = 0;

  let ticksCount = 0;
  for (let measureIndex = 0; measureIndex < rhythm.measures.length; measureIndex++) {
    const currMeasure = rhythm.measures[measureIndex];

    for (let measureOffset = 0; measureOffset < currMeasure.repeat; measureOffset++) {
      for (let beatIndex = 0; beatIndex < currMeasure.beats.length; beatIndex++) {
        const currBeat = currMeasure.beats[beatIndex];
        const maxTicksCount = ticksCount + ticksPerBeat;
        if (maxTicksCount - 1 < currTick) {
          ticksCount = maxTicksCount;
          continue;
        }

        currMeasureIndex = measureIndex;
        currMeasureOffset = measureOffset;
        currBeatIndex = beatIndex;

        currNoteIndex = Math.floor((currTick % ticksPerBeat) / (ticksPerBeat / currBeat.notes.length));

        return {
          currMeasureOffset,
          currMeasureIndex,
          currBeatIndex,
          currNoteIndex,
        };
      }
    }
  }

  return {
    currMeasureOffset,
    currMeasureIndex,
    currBeatIndex,
    currNoteIndex,
  }
}

export const DEFAULT_MEASURES: Measure[] = [
  {
    repeat: 1,
    beats: [
      {
        notes: [
          {
            dynamics: Dynamics.Strong,
          },
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
            dynamics: Dynamics.Light,
          },
        ],
      },
      {
        notes: [
          {
            dynamics: Dynamics.Strong,
          },
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
            dynamics: Dynamics.Light,
          },
        ],
      },
    ],
  }
];

export const SINGLE_RHYTHM: Rhythm = {
  id: "0",
  name: "single",
  category: "default",
  order: 0,
  measures: [
    {
      repeat: 1,
      beats: [
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
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
  id: "1",
  name: "duplets",
  category: "default",
  order: 1,
  measures: [
    {
      repeat: 1,
      beats: [
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
            },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
            },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
            },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
            },
            { dynamics: Dynamics.Light },
          ],
        },
      ],
    },
  ],
};

export const TRIPLETS_RHYTHM: Rhythm = {
  id: "2",
  name: "triplets",
  category: "default",
  order: 1,
  measures: [
    {
      repeat: 1,
      beats: [
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
          ],
        },
        {
          notes: [
            {
              dynamics: Dynamics.Strong,
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
          ],
        },
      ],
    },
  ],
};