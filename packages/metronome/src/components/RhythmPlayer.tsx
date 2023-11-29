import React, { useMemo, useState, useCallback } from "react";
import { useTick } from "../hooks/useTick";
import { Rhythm, locate, parseRhythm } from "../utils/music";
import { RhythmViewer } from "./RhythmViewer";

export interface RhythmPlayerProps {
  rhythm: Rhythm;
  beatsPerMinute: number;
}

export function RhythmPlayer(props: RhythmPlayerProps) {
  const { rhythm, beatsPerMinute } = props;

  const { ticksPerBeat, beatCount } = useMemo(() => {
    return parseRhythm(rhythm);
  }, [rhythm]);

  const [currTick, setCurrTick] = useState(0);
  const incrementTick = useCallback(() => {
    setCurrTick((currTick) => {
      return (currTick + 1) % (ticksPerBeat * beatCount);
    });
  }, [setCurrTick, ticksPerBeat, beatCount]);

  useTick({ beatsPerMinute, ticksPerBeat }, incrementTick);

  const location = useMemo(() => {
    return locate(rhythm, ticksPerBeat, currTick);
  }, [rhythm, currTick, ticksPerBeat]);

  const {
    currMeasureIndex,
    currMeasureOffset,
    currBeatIndex,
    currBeatOffset,
    currNoteIndex,
  } = location;

  return (
    <RhythmViewer
      rhythm={rhythm}
      currMeasureIndex={currMeasureIndex}
      currMeasureOffset={currMeasureOffset}
      currBeatIndex={currBeatIndex}
      currBeatOffset={currBeatOffset}
      currNoteIndex={currNoteIndex}
    />
  );
}
