import React, { useCallback, useState } from "react";
import { Measure, BeatsPerMinute } from "../utils/music";
import { Localized } from "@fluent/react";
import { Card, Button, TabsProps, Tabs } from "antd";
import "./MeasureViewer.css";
import { MeasureBeats } from "./MeasureBeats";
import { MeasureSettings } from "./MeasureSettings";

export type TabsItems = TabsProps["items"];

export interface MeasureViewerProps {
  index: number;
  currMeasureIndex: number;
  currMeasureOffset: number;
  currBeatIndex: number;
  currNoteIndex: number;
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
  onChangeNote: (
    measureIndex: number,
    beatIndex: number,
    noteIndex: number
  ) => void;
  onRemoveNote: (measureIndex: number, beatIndex: number) => void;
}

export function MeasureViewer(props: MeasureViewerProps) {
  const {
    index,
    currBeatIndex,
    currMeasureIndex,
    currMeasureOffset,
    currNoteIndex,
    measure,
    onRemove,
    onChangeRepeat,
    onChangeBeatsPerMinute,
    onAddBeat,
    onRemoveBeat,
    onAddNote,
    onChangeNote,
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

  const handleRemoveMeasure = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  const items: TabsItems = [
    {
      key: "beats",
      label: <Localized id="beats">Beats</Localized>,
      children: (
        <MeasureBeats
          measure={measure}
          measureIndex={index}
          currMeasureIndex={currMeasureIndex}
          currMeasureOffset={currMeasureOffset}
          currBeatIndex={currBeatIndex}
          currNoteIndex={currNoteIndex}
          onAddBeat={onAddBeat}
          onRemoveBeat={onRemoveBeat}
          onAddNote={onAddNote}
          onChangeNote={onChangeNote}
          onRemoveNote={onRemoveNote}
        />
      ),
    },
    {
      key: "tempo",
      label: <Localized id="tempo">Tempo</Localized>,
      children: (
        <MeasureSettings
          measure={measure}
          onChangeRepeat={handleChangeRepeat}
          onChangeBeatsPerMinute={handleChangeBeatsPerMinute}
        />
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
        <Button danger onClick={handleRemoveMeasure}>
          <Localized id="remove-measure">Remove Measure</Localized>
        </Button>
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
