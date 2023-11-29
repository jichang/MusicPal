import React, { useCallback, useMemo, useState } from 'react';
import './RhythmViewer.css';
import { PlusOutlined } from '@ant-design/icons';
import { Localized } from '@fluent/react';
import { Button, Flex, List } from 'antd';
import { MeasureViewer } from './MeasureViewer';
import { usePlayer } from '../hooks/usePlayer';
import { Measure, Rhythm } from '@musicpal/music';
import { useRhythmContext } from '../context/rhythm.context';

export interface RhythmViewerProps {
  isRunning: boolean;
  rhythm: Rhythm;
  currMeasureIndex?: number;
  currMeasureOffset?: number;
  currBeatIndex?: number;
  currNoteIndex?: number;
  onAddMeasure: () => void;
  onRemoveMeasure: (measureIndex: number) => void;
  onChangeRepeat: (measureIndex: number, repeat: number) => void;
  onAddBeat: (measureIndex: number) => void;
  onRemoveBeat: (measureIndex: number) => void;
  onAddNote: (measureIndex: number, beatIndex: number) => void;
  onChangeNote: (
    measureIndex: number,
    beatIndex: number,
    noteIndex: number,
  ) => void;
  onRemoveNote: (measureIndex: number, beatIndex: number) => void;
}

export function RhythmViewer(props: RhythmViewerProps) {
  const {
    isRunning,
    rhythm,
    onAddMeasure,
    onRemoveMeasure,
    onChangeRepeat,
    onAddBeat,
    onRemoveBeat,
    onAddNote,
    onChangeNote,
    onRemoveNote,
  } = props;

  const { currMeasureIndex, currMeasureOffset, currBeatIndex, currNoteIndex } =
    usePlayer({ isRunning, rhythm });
  const { editable } = useRhythmContext();

  return (
    <div className="rhythm__viewer">
      <List<Measure>
        className="measure__list"
        dataSource={rhythm.measures}
        renderItem={(measure, index) => {
          return (
            <List.Item className="measure__list__item" key={index}>
              <MeasureViewer
                index={index}
                measure={measure}
                currMeasureIndex={currMeasureIndex}
                currMeasureOffset={currMeasureOffset}
                currBeatIndex={currBeatIndex}
                currNoteIndex={currNoteIndex}
                onRemove={onRemoveMeasure}
                onChangeRepeat={onChangeRepeat}
                onAddBeat={onAddBeat}
                onRemoveBeat={onRemoveBeat}
                onAddNote={onAddNote}
                onChangeNote={onChangeNote}
                onRemoveNote={onRemoveNote}
              />
            </List.Item>
          );
        }}
        locale={{
          emptyText: <Localized id="no-measures">No Measures</Localized>,
        }}
      />
      <Flex justify="center" className="rhythm__viewer__toolbar">
        <Button
          disabled={!editable}
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddMeasure}
        >
          <Localized id="add-measure">Add Measure</Localized>
        </Button>
      </Flex>
    </div>
  );
}
