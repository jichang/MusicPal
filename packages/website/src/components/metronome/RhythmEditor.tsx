import React, { useCallback, useEffect, useState } from 'react';
import {
  PreparatorySettings,
  RhythmPlayer,
  RhythmViewer,
  TempoSettings,
} from '@musicpal/metronome';
import {
  Tempo,
  Rhythm,
  addBeat,
  addMeasure,
  addNote,
  changeTempo,
  changeNote,
  changeRepeat,
  cloneRhythm,
  removeBeat,
  removeMeasure,
  removeNote,
  changePreparatory,
} from '@musicpal/music';
import './RhythmEditor.css';
import { Button, Modal } from 'antd';
import {
  PauseCircleFilled,
  PlayCircleFilled,
  SaveOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Localized } from '@fluent/react';
import { useFlag } from '../../hooks/useFlag';

export interface RhythmEditorProps {
  rhythm: Rhythm;
  onSave: (rhythm: Rhythm) => void;
  children?: React.ReactNode;
}

export function RhythmEditor(props: RhythmEditorProps) {
  const { children, onSave } = props;

  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const [rhythm, setRhythm] = useState(() => {
    return cloneRhythm(props.rhythm);
  });

  useEffect(() => {
    setRhythm(cloneRhythm(props.rhythm));
  }, [props.rhythm, setRhythm]);

  const updateRhythm = useCallback(
    (updater: Rhythm | ((rhythm: Rhythm) => Rhythm)) => {
      setRhythm(updater);
      setHasPendingChanges(true);
    },
    [setRhythm, setHasPendingChanges],
  );

  const handleAddMeasure = useCallback(() => {
    updateRhythm((rhythm) => {
      return addMeasure(rhythm);
    });
  }, [updateRhythm]);

  const handleRemoveMeasure = useCallback(
    (measureIndex: number) => {
      updateRhythm((rhythm) => {
        return removeMeasure(rhythm, measureIndex);
      });
    },
    [updateRhythm],
  );

  const handleAddBeat = useCallback(
    (measureIndex: number) => {
      updateRhythm((rhythm) => {
        return addBeat(rhythm, measureIndex);
      });
    },
    [updateRhythm],
  );

  const handleRemoveBeat = useCallback(
    (measureIndex: number) => {
      updateRhythm((rhythm) => {
        return removeBeat(rhythm, measureIndex);
      });
    },
    [updateRhythm],
  );

  const handleAddNote = useCallback(
    (measureIndex: number, beatIndex: number) => {
      updateRhythm((rhythm) => {
        return addNote(rhythm, measureIndex, beatIndex);
      });
    },
    [updateRhythm],
  );

  const handleChangeNote = useCallback(
    (measureIndex: number, beatIndex: number, noteIndex: number) => {
      updateRhythm((rhythm) => {
        return changeNote(rhythm, measureIndex, beatIndex, noteIndex);
      });
    },
    [updateRhythm],
  );

  const handleRemoveNote = useCallback(
    (measureIndex: number, beatIndex: number) => {
      updateRhythm((rhythm) => {
        return removeNote(rhythm, measureIndex, beatIndex);
      });
    },
    [updateRhythm],
  );

  const { flag: isRunning, turnOff: stop, toggle } = useFlag(false);

  const handleChangeRepeat = useCallback(
    (measuerIndex: number, repeat: number) => {
      updateRhythm((rhythm) => {
        return changeRepeat(rhythm, measuerIndex, repeat);
      });
    },
    [updateRhythm],
  );

  const {
    flag: isSettingsModalOpened,
    turnOn: openSettingsModal,
    turnOff: closeSettingsModal,
  } = useFlag(false);

  const handleChangePreparatory = useCallback(
    (pareparatory: number) => {
      updateRhythm((rhythm) => {
        return changePreparatory(rhythm, pareparatory);
      });
    },
    [updateRhythm],
  );

  const handleChangeTempo = useCallback(
    (tempo: Tempo) => {
      updateRhythm((rhythm) => {
        return changeTempo(rhythm, tempo);
      });
    },
    [updateRhythm],
  );

  const handleSave = useCallback(() => {
    onSave(rhythm);
    setHasPendingChanges(false);
  }, [rhythm, onSave, setHasPendingChanges]);

  return (
    <div className="rhythm__editor">
      <RhythmPlayer rhythm={rhythm} isRunning={isRunning} onEnd={stop}>
        <RhythmViewer
          rhythm={rhythm}
          onChangeRepeat={handleChangeRepeat}
          onAddMeasure={handleAddMeasure}
          onRemoveMeasure={handleRemoveMeasure}
          onAddBeat={handleAddBeat}
          onRemoveBeat={handleRemoveBeat}
          onAddNote={handleAddNote}
          onChangeNote={handleChangeNote}
          onRemoveNote={handleRemoveNote}
        />
      </RhythmPlayer>
      <div className="rhythm__editor__footer">
        <div className="toolbar">
          <div className="toolbar__main">
            <Button
              type="primary"
              icon={isRunning ? <PauseCircleFilled /> : <PlayCircleFilled />}
              onClick={toggle}
            >
              {isRunning ? (
                <Localized id="pause">Pause</Localized>
              ) : (
                <Localized id="play">Play</Localized>
              )}
            </Button>
            <Button
              disabled={isRunning}
              icon={<SettingOutlined />}
              onClick={openSettingsModal}
            >
              <Localized id="play-settings">Play Settings</Localized>
            </Button>
          </div>
          <div className="toolbar__side">
            <Button
              disabled={!hasPendingChanges}
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
            >
              <Localized id="save">Save</Localized>
            </Button>
          </div>
        </div>
      </div>
      {children}

      <Modal
        title={<Localized id="play-settings">Play Settings</Localized>}
        open={isSettingsModalOpened}
        footer={null}
        onCancel={closeSettingsModal}
      >
        <PreparatorySettings
          preparatory={rhythm.preparatoryBeats}
          onChangePreparatory={handleChangePreparatory}
        />
        <TempoSettings tempo={rhythm.tempo} onChangeTempo={handleChangeTempo} />
      </Modal>
    </div>
  );
}
