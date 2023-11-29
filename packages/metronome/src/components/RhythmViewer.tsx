import React from "react";
import { Rhythm } from "../utils/music";
import "./RhythmViewer.css";
import { NoteButton } from "./NoteButton";

export interface RhythmViewerProps {
  rhythm: Rhythm;
  currMeasureIndex?: number;
  currMeasureOffset?: number;
  currBeatIndex?: number;
  currBeatOffset?: number;
  currNoteIndex?: number;
}

export function RhythmViewer(props: RhythmViewerProps) {
  const {
    rhythm,
    currMeasureIndex = 0,
    currBeatIndex = 0,
    currNoteIndex = 0,
  } = props;

  return (
    <div className="rhythm">
      <div className="measures">
        {rhythm.measures.map((measure, measureIndex) => {
          return (
            <div className="measure" key={measureIndex}>
              {measure.beats.map((beat, beatIndex) => {
                return (
                  <div key={beatIndex} className="beat">
                    {beat.notes.map((note, noteIndex) => {
                      const isCurrent =
                        measureIndex === currMeasureIndex &&
                        beatIndex === currBeatIndex &&
                        noteIndex === currNoteIndex;

                      return (
                        <NoteButton
                          isCurrent={isCurrent}
                          note={note}
                          key={noteIndex}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
