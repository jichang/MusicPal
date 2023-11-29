import React, { useMemo } from "react";
import { Rhythm, parseRhythm } from "../utils/music";
import "./RhythmStatistics.css";

export interface RhythmStatisticsProps {
  rhythm: Rhythm;
}

export function RhythmStatistics(props: RhythmStatisticsProps) {
  const { rhythm } = props;

  const { measureCount, beatCount } = useMemo(() => {
    return parseRhythm(rhythm);
  }, [rhythm]);

  return (
    <div className="rhythm">
      {measureCount} measures, {beatCount} beats
    </div>
  );
}
