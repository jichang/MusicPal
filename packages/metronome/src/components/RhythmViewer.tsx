import React, { useCallback, useMemo, useState } from "react";
import { Measure, locate, parseRhythm } from "../utils/music";
import "./RhythmViewer.css";
import { PlusOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Button, Flex } from "antd";
import { MeasureViewer } from "./MeasureViewer";
import { useTick } from "../hooks/useTick";

export interface RhythmViewerProps {
  isRunning: boolean;
  beatsPerMinute: number;
  measures: Measure[];
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
    measures,
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
    return parseRhythm({ measures });
  }, [measures]);

  const [currTick, setCurrTick] = useState(0);
  const incrementTick = useCallback(() => {
    setCurrTick((currTick) => {
      return (currTick + 1) % (ticksPerBeat * beatCount);
    });
  }, [setCurrTick, ticksPerBeat, beatCount]);

  useTick({ isRunning, beatsPerMinute, ticksPerBeat }, incrementTick);

  const location = useMemo(() => {
    return locate({ measures }, ticksPerBeat, currTick);
  }, [measures, currTick, ticksPerBeat]);

  const { currMeasureIndex, currBeatIndex, currNoteIndex } = location;

  return (
    <div className="rhythm__viewer">
      <div className="measures">
        {measures.map((measure, index) => {
          return (
            <MeasureViewer
              key={index}
              index={index}
              editable={editable}
              measure={measure}
              currMeasureIndex={currMeasureIndex}
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
