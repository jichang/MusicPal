import React, { useCallback } from "react";
import { BeatsPerMinute, Measure } from "../utils/music";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Card, Button } from "antd";
import "./MeasureViewer.css";
import { BeatViewer } from "./BeatViewer";
import { BeatsPerMinuteAdjuster } from "./BeatsPerMinuteAdjuster";

export interface MeasureViewerProps {
  index: number;
  currMeasureIndex: number;
  currMeasureOffset: number;
  currBeatIndex: number;
  currNoteIndex: number;
  editable: boolean;
  measure: Measure;
  onRemove: (measureIndex: number) => void;
  onChangeBeatPerMinute: (
    measureIndex: number,
    beatPerMinute: BeatsPerMinute
  ) => void;
  onAddBeat: (measureIndex: number) => void;
  onRemoveBeat: (measureIndex: number) => void;
  onAddNote: (measureIndex: number, beatIndex: number) => void;
  onRemoveNote: (measureIndex: number, beatIndex: number) => void;
}

export function MeasureViewer(props: MeasureViewerProps) {
  const {
    index,
    currBeatIndex,
    currMeasureIndex,
    currMeasureOffset,
    currNoteIndex,
    editable,
    measure,
    onRemove,
    onChangeBeatPerMinute,
    onAddBeat,
    onRemoveBeat,
    onAddNote,
    onRemoveNote,
  } = props;

  const handleChangeBeatPerMinute = useCallback(
    (beatPerMinute: BeatsPerMinute) => {
      onChangeBeatPerMinute(index, beatPerMinute);
    },
    [index, onChangeBeatPerMinute]
  );

  const handleAddBeat = useCallback(() => {
    onAddBeat(index);
  }, [onAddBeat, index]);

  const handleRemoveBeat = useCallback(() => {
    onRemoveBeat(index);
  }, [onRemoveBeat, index]);

  const handleRemoveMeasure = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  return (
    <Card
      className="measure__viewer"
      title={
        <Localized id="measure-title" vars={{ index: index + 1 }}>
          {`Measure ${index}`}
        </Localized>
      }
      extra={
        editable ? (
          <Button danger onClick={handleRemoveMeasure}>
            <Localized id="remove-measure">Remove Measure</Localized>
          </Button>
        ) : null
      }
    >
      <div className="measure__viewer__content">
        {editable ? (
          <Localized id="remove-beat-btn" attrs={{ title: true }}>
            <Button
              key="remove"
              icon={<MinusOutlined />}
              onClick={handleRemoveBeat}
              title="Remove Beat"
            />
          </Localized>
        ) : null}
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
                editable={editable}
                measureIndex={index}
                beatIndex={beatIndex}
                currBeatIndex={currBeatIndex}
                currMeasureIndex={currMeasureIndex}
                currMeasureOffset={currMeasureOffset}
                currNoteIndex={currNoteIndex}
                onAddNote={onAddNote}
                onRemoveNote={onRemoveNote}
              />
            );
          })}
        </div>
        {editable ? (
          <Localized id="add-beat-btn" attrs={{ title: true }}>
            <Button
              key="add"
              title="Add Beat"
              icon={<PlusOutlined />}
              onClick={handleAddBeat}
            />
          </Localized>
        ) : null}
      </div>
      <div>
        <BeatsPerMinuteAdjuster
          beatsPerMinute={measure.beatsPerMinute}
          onChange={handleChangeBeatPerMinute}
        />
      </div>
    </Card>
  );
}
