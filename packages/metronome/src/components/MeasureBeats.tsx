import React, { useCallback } from "react";
import "./MeasureBeats.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Button } from "antd";
import { BeatViewer } from "./BeatViewer";
import { Measure } from "../utils/music";

export interface MeasureBeatsProps {
  measure: Measure;
  measureIndex: number;
  currMeasureIndex: number;
  currMeasureOffset: number;
  currBeatIndex: number;
  currNoteIndex: number;
  onAddBeat: (measureIndex: number) => void;
  onRemoveBeat: (measureIndex: number) => void;
  onAddNote: (measureIndex: number, beatIndex: number) => void;
  onChangeNote: (
    measureIndex: number,
    beatIndex: number,
    noteIndex: number
  ) => void;
  onRemoveNote: (measureIndex: number, beatIndex: number) => void;
}

export function MeasureBeats(props: MeasureBeatsProps) {
  const {
    measure,
    measureIndex,
    currMeasureIndex,
    currMeasureOffset,
    currBeatIndex,
    currNoteIndex,
    onAddBeat,
    onRemoveBeat,
    onAddNote,
    onChangeNote,
    onRemoveNote,
  } = props;

  const handleAddBeat = useCallback(() => {
    onAddBeat(measureIndex);
  }, [onAddBeat, measureIndex]);

  const handleRemoveBeat = useCallback(() => {
    onRemoveBeat(measureIndex);
  }, [onRemoveBeat, measureIndex]);

  return (
    <div className="measure__beats">
      <Localized id="remove-beat-btn" attrs={{ title: true }}>
        <Button
          key="remove"
          icon={<MinusOutlined />}
          onClick={handleRemoveBeat}
          title="Remove Beat"
        />
      </Localized>
      <div
        className="beats"
        style={{
          gridTemplateColumns: `repeat(${measure.beats.length}, 1fr)`,
        }}
      >
        {measure.beats.map((beat, beatIndex) => {
          return (
            <BeatViewer
              beat={beat}
              key={beatIndex}
              measureIndex={measureIndex}
              beatIndex={beatIndex}
              currBeatIndex={currBeatIndex}
              currMeasureIndex={currMeasureIndex}
              currMeasureOffset={currMeasureOffset}
              currNoteIndex={currNoteIndex}
              onAddNote={onAddNote}
              onChangeNote={onChangeNote}
              onRemoveNote={onRemoveNote}
            />
          );
        })}
      </div>
      <Localized id="add-beat-btn" attrs={{ title: true }}>
        <Button
          key="add"
          title="Add Beat"
          icon={<PlusOutlined />}
          onClick={handleAddBeat}
        />
      </Localized>
    </div>
  );
}
