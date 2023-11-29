import React, { useCallback, useState } from "react";
import {
  BeatsPerMinute as number,
  Measure,
  BeatsPerMinute,
} from "../utils/music";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Card, Button, InputNumber, Form, TabsProps, Tabs } from "antd";
import "./MeasureViewer.css";
import { BeatViewer } from "./BeatViewer";
import { BeatsPerMinuteAdjuster } from "./BeatsPerMinuteAdjuster";

export type TabsItems = TabsProps["items"];

export interface MeasureViewerProps {
  index: number;
  currMeasureIndex: number;
  currMeasureOffset: number;
  currBeatIndex: number;
  currNoteIndex: number;
  editable: boolean;
  measure: Measure;
  onRemove: (measureIndex: number) => void;
  onChangeRepeat: (measureIndex: number, repeat: number) => void;
  onChangeBeatsPerMinute: (
    measureIndex: number,
    beatsPerMinute: BeatsPerMinute
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
    onChangeRepeat,
    onChangeBeatsPerMinute,
    onAddBeat,
    onRemoveBeat,
    onAddNote,
    onRemoveNote,
  } = props;

  const handleChangeRepeat = useCallback(
    (repeat: number | null) => {
      if (repeat) {
        onChangeRepeat(index, repeat);
      }
    },
    [index, onChangeRepeat]
  );

  const handleChangeBeatsPerMinute = useCallback(
    (beatsPerMinute: BeatsPerMinute) => {
      onChangeBeatsPerMinute(index, beatsPerMinute);
    },
    [index, onChangeBeatsPerMinute]
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

  const items: TabsItems = [
    {
      key: "beats",
      label: <Localized id="beats">Beats</Localized>,
      children: (
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
      ),
    },
    {
      key: "tempo",
      label: <Localized id="tempo">Tempo</Localized>,
      children: (
        <div className="measure__viewer__content">
          <Form>
            <Form.Item>
              <InputNumber
                value={measure.repeat}
                onChange={handleChangeRepeat}
              />
            </Form.Item>
            <BeatsPerMinuteAdjuster
              beatsPerMinute={measure.beatsPerMinute}
              onChange={handleChangeBeatsPerMinute}
            />
          </Form>
        </div>
      ),
    },
  ];

  const [activeViewKey, setActiveViewKey] = useState("beats");

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
      <Tabs
        activeKey={activeViewKey}
        items={items}
        onChange={setActiveViewKey}
      />
    </Card>
  );
}
