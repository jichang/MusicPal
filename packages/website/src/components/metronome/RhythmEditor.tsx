import React, { useCallback, useEffect, useState } from "react";
import {
  BeatsPerMinute,
  Rhythm,
  RhythmViewer,
  addBeat,
  addMeasure,
  addNote,
  changeBeatsPerMinute,
  changeNote,
  changeRepeat,
  cloneRhythm,
  removeBeat,
  removeMeasure,
  removeNote,
} from "@musicpal/metronome";
import "./RhythmEditor.css";
import { Button } from "antd";
import {
  PauseCircleFilled,
  PlayCircleFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { useFlag } from "../../hooks/useFlag";

export interface RhythmEditorProps {
  rhythm: Rhythm;
  onSave: (rhythm: Rhythm) => void;
  children?: React.ReactNode;
}

export function RhythmEditor(props: RhythmEditorProps) {
  const { children, onSave } = props;

  const [rhythm, setRhythm] = useState(() => {
    return cloneRhythm(props.rhythm);
  });

  useEffect(() => {
    setRhythm(cloneRhythm(props.rhythm));
  }, [props.rhythm, setRhythm]);

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
    [setRhythm],
  );

  const handleAddBeat = useCallback(
    (measureIndex: number) => {
      setRhythm((rhythm) => {
        return addBeat(rhythm, measureIndex);
      });
    },
    [setRhythm],
  );

  const handleRemoveBeat = useCallback(
    (measureIndex: number) => {
      setRhythm((rhythm) => {
        return removeBeat(rhythm, measureIndex);
      });
    },
    [setRhythm],
  );

  const handleAddNote = useCallback(
    (measureIndex: number, beatIndex: number) => {
      setRhythm((rhythm) => {
        return addNote(rhythm, measureIndex, beatIndex);
      });
    },
    [setRhythm],
  );

  const handleChangeNote = useCallback(
    (measureIndex: number, beatIndex: number, noteIndex: number) => {
      setRhythm((rhythm) => {
        return changeNote(rhythm, measureIndex, beatIndex, noteIndex);
      });
    },
    [setRhythm],
  );

  const handleRemoveNote = useCallback(
    (measureIndex: number, beatIndex: number) => {
      setRhythm((rhythm) => {
        return removeNote(rhythm, measureIndex, beatIndex);
      });
    },
    [setRhythm],
  );

  const { flag: isRunning, toggle } = useFlag(false);

  const handleChangeRepeat = useCallback(
    (measuerIndex: number, repeat: number) => {
      setRhythm((rhythm) => {
        return changeRepeat(rhythm, measuerIndex, repeat);
      });
    },
    [setRhythm],
  );

  const handleChangeBeatsPerMinute = useCallback(
    (measuerIndex: number, beatsPerMinute: BeatsPerMinute) => {
      setRhythm((rhythm) => {
        return changeBeatsPerMinute(rhythm, measuerIndex, beatsPerMinute);
      });
    },
    [setRhythm],
  );

  const handleSave = useCallback(() => {
    onSave(rhythm);
  }, [rhythm, onSave]);

  return (
    <div className="rhythm__editor">
      <RhythmViewer
        rhythm={rhythm}
        isRunning={isRunning}
        onChangeRepeat={handleChangeRepeat}
        onChangeBeatsPerMinute={handleChangeBeatsPerMinute}
        onAddMeasure={handleAddMeasure}
        onRemoveMeasure={handleRemoveMeasure}
        onAddBeat={handleAddBeat}
        onRemoveBeat={handleRemoveBeat}
        onAddNote={handleAddNote}
        onChangeNote={handleChangeNote}
        onRemoveNote={handleRemoveNote}
      />
      <div className="rhythm__editor__footer">
        <div className="toolbar">
          <div className="toolbar__main">
            <Button
              icon={isRunning ? <PauseCircleFilled /> : <PlayCircleFilled />}
              onClick={toggle}
            >
              {isRunning ? (
                <Localized id="pause">Pause</Localized>
              ) : (
                <Localized id="play">Play</Localized>
              )}
            </Button>
          </div>
          <div className="toolbar__side">
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              <Localized id="save">Save</Localized>
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
