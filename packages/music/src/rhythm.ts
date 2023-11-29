import { DEFAULT_MEASURES } from './constants';
import { lcm } from './math';
import {
  Tempo,
  Note,
  Beat,
  Measure,
  Rhythm,
  Dynamics,
  UniformTempo,
} from './theory';
import * as R from 'ramda';

export function cloneTempo<T extends Tempo>(tempo: T): T {
  return R.clone(tempo);
}

export function cloneNote(note: Note): Note {
  return R.clone(note);
}

export function cloneBeat(beat: Beat): Beat {
  return R.clone(beat);
}

export function cloneMeasure(measure: Measure): Measure {
  return R.clone(measure);
}

export function cloneRhythm(rhythm: Rhythm): Rhythm {
  return R.clone(rhythm);
}

export function changePreparatory(rhythm: Rhythm, preparatory: number) {
  const newRhythm = cloneRhythm(rhythm);
  newRhythm.preparatoryBeats = preparatory;

  return newRhythm;
}

export function changeTempo(rhythm: Rhythm, tempo: Tempo) {
  const newRhythm = cloneRhythm(rhythm);
  newRhythm.tempo = cloneTempo(tempo);

  return newRhythm;
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
  repeat: number,
) {
  const newRhythm = cloneRhythm(rhythm);
  const measure = newRhythm.measures[measureIndex];
  if (measure) {
    measure.repeat = repeat;
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
  beatIndex: number,
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
  noteIndex: number,
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
  beatIndex: number,
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

export function analyseRhythm(rhythm: Rhythm) {
  let measuresCount = 0;
  let beatsCount = 0;
  let notesCount = 0;
  let ticksCount = 0;
  let ticksPerBeat = 0;
  let tempos: UniformTempo[] = [];

  switch (rhythm.tempo.type) {
    case 'uniform':
      tempos.push(cloneTempo(rhythm.tempo));
      break;
    case 'varying':
      {
        for (
          let speed = rhythm.tempo.begin;
          speed <= rhythm.tempo.end;
          speed += rhythm.tempo.step
        ) {
          tempos.push({
            type: 'uniform',
            speed,
          });
        }
      }
      break;
  }

  for (const measure of rhythm.measures) {
    measuresCount = measuresCount + measure.repeat;

    for (const beat of measure.beats) {
      beatsCount = beatsCount + measure.repeat;

      notesCount = notesCount + beat.notes.length * measure.repeat;

      ticksPerBeat = lcm(ticksPerBeat, beat.notes.length);
    }
  }
  ticksCount = beatsCount * ticksPerBeat;

  return {
    tempos,
    measuresCount,
    beatsCount,
    notesCount,
    ticksCount,
    ticksPerBeat,
  };
}

export function locate(
  rhythm: Rhythm,
  ticksPerBeat: number,
  tickIndex: number,
) {
  let measureIndex = 0;
  let measureOffset = 0;
  let beatIndex = 0;
  let beatOffset = 0;
  let noteIndex = 0;
  let noteOffset = 0;
  let ticksCount = 0;

  for (
    let currMeasureIndex = 0;
    currMeasureIndex < rhythm.measures.length;
    currMeasureIndex++
  ) {
    const currMeasure = rhythm.measures[currMeasureIndex];

    for (
      let currMeasureOffset = 0;
      currMeasureOffset < currMeasure.repeat;
      currMeasureOffset++
    ) {
      for (
        let currBeatIndex = 0;
        currBeatIndex < currMeasure.beats.length;
        currBeatIndex++
      ) {
        const currBeat = currMeasure.beats[currBeatIndex];
        const maxTicksCount = ticksCount + ticksPerBeat;
        if (maxTicksCount - 1 < tickIndex) {
          ticksCount = maxTicksCount;
          beatOffset = beatOffset + 1;
          noteOffset = noteOffset + currBeat.notes.length;
          continue;
        }

        measureIndex = currMeasureIndex;
        measureOffset = currMeasureOffset;
        beatIndex = currBeatIndex;
        noteIndex = Math.floor(
          (tickIndex % ticksPerBeat) / (ticksPerBeat / currBeat.notes.length),
        );
        noteOffset = noteOffset + noteIndex;

        return {
          measureOffset,
          measureIndex,
          beatIndex,
          beatOffset,
          noteIndex,
          noteOffset,
        };
      }
    }
  }

  return {
    measureOffset,
    measureIndex,
    beatIndex,
    beatOffset,
    noteIndex,
    noteOffset,
  };
}
