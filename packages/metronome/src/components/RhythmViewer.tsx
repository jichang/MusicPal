import React, { useCallback, useMemo, useState } from "react";
import { Rhythm, locate, parseRhythm } from "../utils/music";
import "./RhythmViewer.css";
import { PlusOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Button, Flex } from "antd";
import { MeasureViewer } from "./MeasureViewer";
import { useTick } from "../hooks/useTick";

export interface RhythmViewerProps {
  isRunning: boolean;
  beatsPerMinute: number;
  rhythm: Rhythm;
  currMeasureIndex?: number;
  currMeasureOffset?: number;
  currBeatIndex?: number;
  currNoteIndex?: number;
  editable: boolean;
  onAddMeasure: () => void;
  onRemoveMeasure: (measureIndex: number) => void;
  onAddBeat: (measureIndex: number) => void;
  onRemoveBeat: (measureIndex: number) => void;
  onAddNote: (measureIndex: number, beatIndex: number) => void;
  onRemoveNote: (measureIndex: number, beatIndex: number) => void;
}

export function RhythmViewer(props: RhythmViewerProps) {
  const {
    isRunning,
    rhythm,
    beatsPerMinute,
    editable,
    onAddMeasure,
    onRemoveMeasure,
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

  useTick({ isRunning, beatsPerMinute, ticksPerBeat }, incrementTick);

  const location = useMemo(() => {
    return locate(rhythm, ticksPerBeat, currTick);
  }, [rhythm, currTick, ticksPerBeat]);

  const { currMeasureIndex, currMeasureOffset, currBeatIndex, currNoteIndex } =
    location;

  return (
    <div className="rhythm__viewer">
      <div className="measures">
        {rhythm.measures.map((measure, index) => {
          return (
            <MeasureViewer
              key={index}
              index={index}
              editable={editable}
              measure={measure}
              currMeasureIndex={currMeasureIndex}
              currMeasureOffset={currMeasureOffset}
              currBeatIndex={currBeatIndex}
              currNoteIndex={currNoteIndex}
              onRemove={onRemoveMeasure}
              onAddBeat={onAddBeat}
              onRemoveBeat={onRemoveBeat}
              onAddNote={onAddNote}
              onRemoveNote={onRemoveNote}
            />
          );
        })}
      </div>
      {editable ? (
        <Flex justify="center" className="rhythm__viewer__toolbar">
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddMeasure}>
            <Localized id="add-measure">Add Measure</Localized>
          </Button>
        </Flex>
      ) : null}
    </div>
  );
}
