import React, { useCallback } from 'react';
import { NoteIcon } from './NoteIcon';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Localized } from '@fluent/react';
import { Button } from 'antd';
import './BeatViewer.css';
import { Beat } from '@musicpal/music';
import { useRhythmContext } from '../context/rhythm.context';

export interface BeatViewerProps {
  beat: Beat;
  measureIndex: number;
  beatIndex: number;
  currMeasureIndex: number;
  currMeasureOffset: number;
  currBeatIndex: number;
  currNoteIndex: number;
  onAddNote: (measureIndex: number, beatIndex: number) => void;
  onChangeNote: (
    measureIndex: number,
    beatIndex: number,
    noteIndex: number,
  ) => void;
  onRemoveNote: (measureIndex: number, beatIndex: number) => void;
}

export function BeatViewer(props: BeatViewerProps) {
  const {
    beat,
    measureIndex,
    beatIndex,
    currBeatIndex,
    currMeasureIndex,
    currNoteIndex,
    onAddNote,
    onChangeNote,
    onRemoveNote,
  } = props;

  const handleAddNote = useCallback(() => {
    onAddNote(measureIndex, beatIndex);
  }, [onAddNote, measureIndex, beatIndex]);

  const handleRemoveNote = useCallback(() => {
    onRemoveNote(measureIndex, beatIndex);
  }, [onRemoveNote, measureIndex, beatIndex]);

  const handleChangeNote = useCallback(
    (noteIndex: number) => {
      onChangeNote(measureIndex, beatIndex, noteIndex);
    },
    [onChangeNote, measureIndex, beatIndex],
  );
  const { editable } = useRhythmContext();

  return (
    <div key={beatIndex} className="beat">
      <Localized id="remove-note-btn" attrs={{ title: true }}>
        <Button
          shape="circle"
          disabled={!editable}
          className="button--oper"
          title="Remove Note"
          icon={<MinusOutlined />}
          onClick={handleRemoveNote}
        />
      </Localized>
      <div className="notes">
        {beat.notes.map((note, noteIndex) => {
          const isCurrent =
            measureIndex === currMeasureIndex &&
            beatIndex === currBeatIndex &&
            noteIndex === currNoteIndex;

          return (
            <div key={noteIndex} className="note">
              <NoteIcon
                index={noteIndex}
                isCurrent={isCurrent}
                note={note}
                onClick={handleChangeNote}
              />
            </div>
          );
        })}
      </div>
      <Localized id="add-note-btn" attrs={{ title: true }}>
        <Button
          shape="circle"
          disabled={!editable}
          className="button--oper"
          title="Add Note"
          icon={<PlusOutlined />}
          onClick={handleAddNote}
        />
      </Localized>
    </div>
  );
}
