import React from "react";
import "./Metronome.css";
import { rhythms } from "../utils/music";
import { RhythmViewer } from "./RhythmViewer";
import { RhythmStatistics } from "./RhythmStatistics";

export function Metronome() {
  return (
    <div className="metronome">
      {rhythms.map((rhythm, index) => {
        return (
          <div key={index}>
            <RhythmViewer rhythm={rhythm} />
            <RhythmStatistics rhythm={rhythm} />
          </div>
        );
      })}
    </div>
  );
}
