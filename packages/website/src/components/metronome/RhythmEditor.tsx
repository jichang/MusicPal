import React, { useCallback, useState } from "react";
import {
  Rhythm,
  RhythmViewer,
  addBeat,
  addMeasure,
  addNote,
  cloneRhythm,
  removeBeat,
  removeMeasure,
  removeNote,
} from "@musicpal/metronome";
import "./RhythmEditor.css";

export interface RhythmEditorProps {
  isRunning: boolean;
  beatsPerMinute: number;
  rhythm: Rhythm;
  children?: React.ReactNode;
}

export function RhythmEditor(props: RhythmEditorProps) {
  const { isRunning, beatsPerMinute, children } = props;

  const [rhythm, setRhythm] = useState(() => {
    return cloneRhythm(props.rhythm);
  });

  const handleAddMeasure = useCallback(() => {
    setRhythm((rhythm) => {
      return addMeasure(rhythm);
    });
  }, [setRhythm]);

  const handleRemoveMeasure = useCallback(
    (measureIndex: number) => {
      setRhythm((rhythm) => {
        return removeMeasure(rhythm, measureIndex);
      });
    },
    [setRhythm]
  );

  const handleAddBeat = useCallback(
    (measureIndex: number) => {
      setRhythm((rhythm) => {
        return addBeat(rhythm, measureIndex);
      });
    },
    [setRhythm]
  );

  const handleRemoveBeat = useCallback(
    (measureIndex: number) => {
      setRhythm((rhythm) => {
        return removeBeat(rhythm, measureIndex);
      });
    },
    [setRhythm]
  );

  const handleAddNote = useCallback(
    (measureIndex: number, beatIndex: number) => {
      setRhythm((rhythm) => {
        return addNote(rhythm, measureIndex, beatIndex);
      });
    },
    [setRhythm]
  );

  const handleRemoveNote = useCallback(
    (measureIndex: number, beatIndex: number) => {
      setRhythm((rhythm) => {
        return removeNote(rhythm, measureIndex, beatIndex);
      });
    },
    [setRhythm]
  );

  return (
    <div className="rhythm__editor">
      <RhythmViewer
        editable={rhythm.category !== "default"}
        rhythm={rhythm}
        isRunning={isRunning}
        beatsPerMinute={beatsPerMinute}
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
