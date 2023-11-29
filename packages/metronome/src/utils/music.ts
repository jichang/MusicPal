import { lcm } from "./math";

export interface UniformBeatsPerMinute {
  type: "uniform";
  speed: number;
}

export interface VaryingBeatsPerMinute {
  type: "varying";
  begin: number;
  step: number;
  end: number;
}

export type BeatsPerMinute = UniformBeatsPerMinute | VaryingBeatsPerMinute;

export const UNIFORM_BPM_60: UniformBeatsPerMinute = {
  type: "uniform",
  speed: 60,
};

export const VARYING_BPM_60: VaryingBeatsPerMinute = {
  type: "varying",
  begin: 60,
  end: 60,
  step: 10,
};

export enum Dynamics {
  None = 0,
  Light,
  Accent,
  Invalid,
}

export interface Note {
  dynamics: Dynamics;
}

export function cloneNote(note: Note): Note {
  return {
    ...note,
  };
}

export interface Beat {
  notes: Note[];
}

export function cloneBeat(beat: Beat): Beat {
  return {
    notes: beat.notes.map((note) => {
      return {
        ...note,
      };
    }),
  };
}

export interface Measure {
  repeat: number;
  beatsPerMinute: BeatsPerMinute;
  beats: Beat[];
}

export function cloneMeasure(measure: Measure): Measure {
  return {
    repeat: measure.repeat,
    beatsPerMinute: measure.beatsPerMinute,
    beats: measure.beats.map(cloneBeat),
  };
}

export interface Rhythm {
  id: string;
  category: "default" | "personal";
  name: string;
  order: number;
  measures: Measure[];
}

export function cloneRhythm(rhythm: Rhythm): Rhythm {
  return {
    id: rhythm.id,
    category: rhythm.category,
    name: rhythm.name,
    order: rhythm.order,
    measures: rhythm.measures.map(cloneMeasure),
  };
}

export function addMeasure(rhythm: Rhythm) {
  const newRhythm = cloneRhythm(rhythm);
  const lastMeasure = newRhythm.measures[rhythm.measures.length - 1];
  if (lastMeasure) {
    newRhythm.measures.push(cloneMeasure(lastMeasure));
  } else {
    newRhythm.measures = DEFAULT_MEASURES;
  }

  return newRhythm;
}

export function removeMeasure(rhythm: Rhythm, measureIndex: number) {
  const newRhythm = cloneRhythm(rhythm);
  newRhythm.measures.splice(measureIndex, 1);

  return newRhythm;
}

export function changeRepeat(
  rhythm: Rhythm,
  measureIndex: number,
  repeat: number
) {
  const newRhythm = cloneRhythm(rhythm);
  const measure = newRhythm.measures[measureIndex];
  if (measure) {
    measure.repeat = repeat;
  }

  return newRhythm;
}

export function changeBeatsPerMinute(
  rhythm: Rhythm,
  measureIndex: number,
  beatsPerMinute: BeatsPerMinute
) {
  const newRhythm = cloneRhythm(rhythm);
  const measure = newRhythm.measures[measureIndex];
  if (measure) {
    measure.beatsPerMinute = beatsPerMinute;
  }

  return newRhythm;
}

export function addBeat(rhythm: Rhythm, measureIndex: number) {
  const newRhythm = cloneRhythm(rhythm);
  const measure = newRhythm.measures[measureIndex];
  if (measure) {
    const beat = measure.beats[measure.beats.length - 1];
    if (beat) {
      measure.beats.push(cloneBeat(beat));
    }
  }

  return newRhythm;
}

export function removeBeat(rhythm: Rhythm, measureIndex: number) {
  const newRhythm = cloneRhythm(rhythm);
  const measure = newRhythm.measures[measureIndex];
  if (measure) {
    measure.beats = measure.beats.slice(0, measure.beats.length - 1);
    if (measure.beats.length === 0) {
      newRhythm.measures.splice(measureIndex, 1);
    }
  }

  return newRhythm;
}

export function addNote(
  rhythm: Rhythm,
  measureIndex: number,
  beatIndex: number
) {
  const newRhythm = cloneRhythm(rhythm);

  const measure = newRhythm.measures[measureIndex];
  if (measure) {
    const beat = measure.beats[beatIndex];
    if (beat) {
      const lastNote = beat.notes[beat.notes.length - 1];
      beat.notes.push(cloneNote(lastNote));
    }
  }

  return newRhythm;
}

export function changeNote(
  rhythm: Rhythm,
  measureIndex: number,
  beatIndex: number,
  noteIndex: number
) {
  const newRhythm = cloneRhythm(rhythm);

  const measure = newRhythm.measures[measureIndex];
  if (measure) {
    const beat = measure.beats[beatIndex];
    if (beat) {
      const note = beat.notes[noteIndex];
      if (note) {
        note.dynamics = (note.dynamics + 1) % Dynamics.Invalid;
      }
    }
  }

  return newRhythm;
}

export function removeNote(
  rhythm: Rhythm,
  measureIndex: number,
  beatIndex: number
) {
  const newRhythm = cloneRhythm(rhythm);

  const measure = newRhythm.measures[measureIndex];
  if (measure) {
    const beat = measure.beats[beatIndex];
    if (beat) {
      if (beat.notes.length === 1) {
        measure.beats.splice(beatIndex, 1);
      } else {
        beat.notes = beat.notes.slice(0, beat.notes.length - 1);
      }
    }
  }

  return newRhythm;
}

export function parseRhythm(rhythm: Rhythm) {
  let measureCount = 0;
  let beatCount = 0;
  let noteCount = 0;
  let ticksPerBeat = 1;

  for (const measure of rhythm.measures) {
    for (
      let measureOffset = 0;
      measureOffset < measure.repeat;
      measureOffset++
    ) {
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
    ticksPerBeat,
  };
}

export function locate(rhythm: Rhythm, ticksPerBeat: number, currTick: number) {
  let currMeasureIndex = 0;
  let currMeasureOffset = 0;
  let currBeatIndex = 0;
  let currNoteIndex = 0;

  let ticksCount = 0;
  for (
    let measureIndex = 0;
    measureIndex < rhythm.measures.length;
    measureIndex++
  ) {
    const currMeasure = rhythm.measures[measureIndex];

    for (
      let measureOffset = 0;
      measureOffset < currMeasure.repeat;
      measureOffset++
    ) {
      for (
        let beatIndex = 0;
        beatIndex < currMeasure.beats.length;
        beatIndex++
      ) {
        const currBeat = currMeasure.beats[beatIndex];
        const maxTicksCount = ticksCount + ticksPerBeat;
        if (maxTicksCount - 1 < currTick) {
          ticksCount = maxTicksCount;
          continue;
        }

        currMeasureIndex = measureIndex;
        currMeasureOffset = measureOffset;
        currBeatIndex = beatIndex;

        currNoteIndex = Math.floor(
          (currTick % ticksPerBeat) / (ticksPerBeat / currBeat.notes.length)
        );

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
  };
}

export const DEFAULT_MEASURES: Measure[] = [
  {
    repeat: 1,
    beatsPerMinute: UNIFORM_BPM_60,
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
  id: "0",
  name: "single",
  category: "default",
  order: 0,
  measures: [
    {
      repeat: 1,
      beatsPerMinute: UNIFORM_BPM_60,
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
  id: "1",
  name: "duplets",
  category: "default",
  order: 1,
  measures: [
    {
      repeat: 1,
      beatsPerMinute: UNIFORM_BPM_60,
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
  id: "2",
  name: "triplets",
  category: "default",
  order: 1,
  measures: [
    {
      repeat: 1,
      beatsPerMinute: UNIFORM_BPM_60,
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
