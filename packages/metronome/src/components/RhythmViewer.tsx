import React, { useCallback, useMemo, useState } from "react";
import { BeatsPerMinute, Rhythm, locate, parseRhythm } from "../utils/music";
import "./RhythmViewer.css";
import { PlusOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Button, Flex, List } from "antd";
import { MeasureViewer } from "./MeasureViewer";
import { useTick } from "../hooks/useTick";

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
  onChangeBeatsPerMinute: (
    measureIndex: number,
    beatPerMinute: BeatsPerMinute
  ) => void;
  onAddBeat: (measureIndex: number) => void;
  onRemoveBeat: (measureIndex: number) => void;
  onAddNote: (measureIndex: number, beatIndex: number) => void;
  onRemoveNote: (measureIndex: number, beatIndex: number) => void;
}

export function RhythmViewer(props: RhythmViewerProps) {
  const {
    isRunning,
    rhythm,
    onAddMeasure,
    onRemoveMeasure,
    onChangeRepeat,
    onChangeBeatsPerMinute,
    onAddBeat,
    onRemoveBeat,
    onAddNote,
    onRemoveNote,
  } = props;

  const { ticksPerBeat, beatCount } = useMemo(() => {
    return parseRhythm(rhythm);
  }, [rhythm]);

  const [currTick, setCurrTick] = useState(0);
  const incrementTick = useCallback(() => {
    setCurrTick((currTick) => {
      return (currTick + 1) % (ticksPerBeat * beatCount);
    });
  }, [setCurrTick, ticksPerBeat, beatCount]);

  useTick({ isRunning, beatsPerMinute: 60, ticksPerBeat }, incrementTick);

  const location = useMemo(() => {
    return locate(rhythm, ticksPerBeat, currTick);
  }, [rhythm, currTick, ticksPerBeat]);

  const { currMeasureIndex, currMeasureOffset, currBeatIndex, currNoteIndex } =
    location;

  return (
    <div className="rhythm__viewer">
      <List
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
                onChangeBeatsPerMinute={onChangeBeatsPerMinute}
                onAddBeat={onAddBeat}
                onRemoveBeat={onRemoveBeat}
                onAddNote={onAddNote}
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
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddMeasure}>
          <Localized id="add-measure">Add Measure</Localized>
        </Button>
      </Flex>
    </div>
  );
}
