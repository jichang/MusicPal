import React, { useCallback } from "react";
import { Beat } from "../utils/music";
import { NoteButton } from "./NoteButton";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Button } from "antd";
import "./BeatViewer.css";

export interface BeatViewerProps {
  editable: boolean;
  beat: Beat;
  measureIndex: number;
  beatIndex: number;
  currMeasureIndex?: number;
  currMeasureOffset?: number;
  currBeatIndex?: number;
  currNoteIndex?: number;
  onAddNote: (measureIndex: number, beatIndex: number) => void;
  onRemoveNote: (measureIndex: number, beatIndex: number) => void;
}

export function BeatViewer(props: BeatViewerProps) {
  const {
    editable,
    beat,
    measureIndex,
    beatIndex,
    currBeatIndex,
    currMeasureIndex,
    currNoteIndex,
    onAddNote,
    onRemoveNote,
  } = props;

  const handleAddNote = useCallback(() => {
    onAddNote(measureIndex, beatIndex);
  }, [onAddNote, measureIndex, beatIndex]);

  const handleRemoveNote = useCallback(() => {
    onRemoveNote(measureIndex, beatIndex);
  }, [onRemoveNote, measureIndex, beatIndex]);

  return (
    <div key={beatIndex} className="beat">
      {editable ? (
        <Localized id="remove-note-btn" attrs={{ title: true }}>
          <Button
            className="button--oper"
            title="Remove Note"
            icon={<MinusOutlined />}
            onClick={handleRemoveNote}
            disabled={beat.notes.length === 1}
          />
        </Localized>
      ) : null}
      <div className="notes">
        {beat.notes.map((note, noteIndex) => {
          const isCurrent =
            measureIndex === currMeasureIndex &&
            beatIndex === currBeatIndex &&
            noteIndex === currNoteIndex;

          return (
            <NoteButton isCurrent={isCurrent} note={note} key={noteIndex} />
          );
        })}
      </div>
      {editable ? (
        <Localized id="add-note-btn" attrs={{ title: true }}>
          <Button
            className="button--oper"
            title="Add Note"
            icon={<PlusOutlined />}
            onClick={handleAddNote}
          />
        </Localized>
      ) : null}
    </div>
  );
}
