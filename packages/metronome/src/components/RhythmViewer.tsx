import React from "react";
import { Rhythm } from "../utils/music";
import './RhythmViewer.css';

export interface RhythmViewerProps {
  rhythm: Rhythm;
  currMeasureIndex: number;
  currMeasureOffset: number;
  currBeatIndex: number;
  currBeatOffset: number;
  currNoteIndex: number;
}

export function RhythmViewer(props: RhythmViewerProps) {
  const { rhythm, currMeasureIndex, currBeatIndex, currNoteIndex } = props;

  return (
    <div className="rhythm">
      {
        rhythm.measures.map((measure, measureIndex) => {
          return (
            <div className="measure" key={measureIndex}>
              {measure.beats.map((beat, beatIndex) => {
                return (
                  <div key={beatIndex} className="beat">
                    {beat.notes.map((note, noteIndex) => {
                      const isCurrent = measureIndex === currMeasureIndex && beatIndex === currBeatIndex && noteIndex === currNoteIndex;
                      return <button title="note" className={`note note--${note.dynamics} ${isCurrent ? "note--active" : ""}`} key={noteIndex} />
                    })}
                  </div>
                )
              })}
            </div>
          )
        })
      }
    </div>
  )
}