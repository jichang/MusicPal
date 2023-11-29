import React, { useCallback, useState } from "react";
import {
  Rhythm,
  RhythmViewer,
  cloneBeat,
  cloneMeasure,
  cloneNote,
} from "@musicpal/metronome";
import "./RhythmEditor.css";

export interface RhythmEditorProps {
  rhythm: Rhythm;
  children?: React.ReactNode;
}

export function RhythmEditor(props: RhythmEditorProps) {
  const { rhythm, children } = props;

  const [measures, setMeasures] = useState(rhythm.measures);

  const handleAddMeasure = useCallback(() => {
    setMeasures((measures) => {
      const lastMeasure = measures[measures.length - 1];

      return [...measures, cloneMeasure(lastMeasure)];
    });
  }, [setMeasures]);

  const handleRemoveMeasure = useCallback(
    (measureIndex: number) => {
      setMeasures((measures) => {
        if (measures.length === 1) {
          return measures;
        }

        return measures.filter((_, index) => {
          return index !== measureIndex;
        });
      });
    },
    [setMeasures]
  );

  const handleAddBeat = useCallback(
    (measureIndex: number) => {
      setMeasures((measures) => {
        return measures.map((measure, index) => {
          if (index !== measureIndex) {
            return measure;
          } else {
            const lastBeat = measure.beats[measure.beats.length - 1];

            return {
              ...measure,
              beats: [...measure.beats, cloneBeat(lastBeat)],
            };
          }
        });
      });
    },
    [setMeasures]
  );

  const handleRemoveBeat = useCallback(
    (measureIndex: number) => {
      setMeasures((measures) => {
        return measures.map((measure, index) => {
          if (index !== measureIndex) {
            return measure;
          } else {
            if (measure.beats.length === 1) {
              return measure;
            }

            return {
              repeat: measure.repeat,
              beats: measure.beats.slice(0, measure.beats.length - 1),
            };
          }
        });
      });
    },
    [setMeasures]
  );

  const handleAddNote = useCallback(
    (measureIndex: number, beatIndex: number) => {
      setMeasures((measures) => {
        return measures.map((measure, index) => {
          if (index !== measureIndex) {
            return measure;
          } else {
            return {
              ...measure,
              beats: measure.beats.map((beat, index) => {
                if (index !== beatIndex) {
                  return beat;
                } else {
                  const note = cloneNote(beat.notes[beat.notes.length - 1]);
                  return {
                    notes: [...beat.notes, note],
                  };
                }
              }),
            };
          }
        });
      });
    },
    [setMeasures]
  );

  const handleRemoveNote = useCallback(
    (measureIndex: number, beatIndex: number) => {
      setMeasures((measures) => {
        return measures.map((measure, index) => {
          if (index !== measureIndex) {
            return measure;
          } else {
            return {
              ...measure,
              beats: measure.beats.map((beat, index) => {
                if (index !== beatIndex) {
                  return beat;
                } else {
                  if (beat.notes.length === 1) {
                    return beat;
                  }

                  return {
                    notes: beat.notes.slice(0, beat.notes.length - 1),
                  };
                }
              }),
            };
          }
        });
      });
    },
    [setMeasures]
  );

  return (
    <div className="rhythm__editor">
      <RhythmViewer
        editable={rhythm.category !== "default"}
        measures={measures}
        isRunning={false}
        beatsPerMinute={0}
        onAddMeasure={handleAddMeasure}
        onRemoveMeasure={handleRemoveMeasure}
        onAddBeat={handleAddBeat}
        onRemoveBeat={handleRemoveBeat}
        onAddNote={handleAddNote}
        onRemoveNote={handleRemoveNote}
      />
      {children}
    </div>
  );
}
