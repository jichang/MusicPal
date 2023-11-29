import { lcm } from "./math";

export enum Dynamics {
  None = 0,
  Light,
  Strong,
}

export interface Note {
  dynamics: Dynamics;
}

export interface Beat {
  repeat: number;
  notes: Note[];
}

export interface Measure {
  repeat: number;
  beats: Beat[];
}

export interface Rhythm {
  measures: Measure[];
}

export const Rhythm4_4: Rhythm = {
  measures: [
    {
      repeat: 1,
      beats: [
        {
          repeat: 1,
          notes: [
            {
              dynamics: Dynamics.Strong
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light }
          ]
        },
      ]
    },
  ]
}

export const Rhythm8_8: Rhythm = {
  measures: [
    {
      repeat: 1,
      beats: [
        {
          repeat: 1,
          notes: [
            {
              dynamics: Dynamics.Strong
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light }
          ]
        },
        {
          repeat: 1,
          notes: [
            {
              dynamics: Dynamics.Strong
            },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light },
            { dynamics: Dynamics.Light }
          ]
        }
      ]
    },
  ]
}

export const rhythms = [Rhythm4_4, Rhythm8_8];

export function parseRhythm(rhythm: Rhythm) {
  let measureCount = 0;
  let beatCount = 0;
  let noteCount = 0;
  let ticksPerBeat = 1;

  for (const measure of rhythm.measures) {
    for (let measureOffset = 0; measureOffset < measure.repeat; measureOffset++) {
      measureCount = measureCount + 1;

      for (const beat of measure.beats) {
        for (let beatOffset = 0; beatOffset < beat.repeat; beatOffset++) {
          beatCount = beatCount + 1;

          noteCount = noteCount + beat.notes.length;
        }

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

export function locate(rhythm: Rhythm, ticksPerBeat: number, currTick: number) {
  let currMeasureIndex = 0;
  let currMeasureOffset = 0;
  let currBeatIndex = 0;
  let currBeatOffset = 0;
  let currNoteIndex = 0;

  let ticksCount = 0;
  for (let measureIndex = 0; measureIndex < rhythm.measures.length; measureIndex++) {
    const currMeasure = rhythm.measures[measureIndex];

    for (let measureOffset = 0; measureOffset < currMeasure.repeat; measureOffset++) {
      for (let beatIndex = 0; beatIndex < currMeasure.beats.length; beatIndex++) {
        const currBeat = currMeasure.beats[beatIndex];
        for (let beatOffset = 0; beatOffset < currBeat.repeat; beatOffset++) {
          const maxTicksCount = ticksCount + ticksPerBeat;
          if (maxTicksCount - 1 < currTick) {
            ticksCount = maxTicksCount;
            continue;
          }

          currMeasureIndex = measureIndex;
          currMeasureOffset = measureOffset;
          currBeatIndex = beatIndex;
          currBeatOffset = beatOffset;

          currNoteIndex = Math.floor((currTick % ticksPerBeat) / (ticksPerBeat / currBeat.notes.length));

          return {
            currMeasureOffset,
            currMeasureIndex,
            currBeatIndex,
            currBeatOffset,
            currNoteIndex,
          };
        }
      }
    }
  }

  return {
    currMeasureOffset,
    currMeasureIndex,
    currBeatIndex,
    currBeatOffset,
    currNoteIndex,
  }
}
