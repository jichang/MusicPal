import React, { useCallback, useMemo, useState } from "react";
import "./Metronome.css";
import { useTick } from "../hooks/useTick";
import { Rhythm, Rhythm4_4, locate, parseRhythm } from "../utils/music";
import { RhythmViewer } from "./RhythmViewer";

export function Metronome() {
  const [beatsPerMinute, setBeatsPerMinute] = useState(60);
  const [rhythm, setRhythm] = useState<Rhythm>(Rhythm4_4);

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
    <div className="metronome">
      <RhythmViewer
        rhythm={rhythm}
        currMeasureIndex={currMeasureIndex}
        currMeasureOffset={currMeasureOffset}
        currBeatIndex={currBeatIndex}
        currBeatOffset={currBeatOffset}
        currNoteIndex={currNoteIndex}
      />
    </div>
  );
}
