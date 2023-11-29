import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Rhythm,
  Tempo,
  UniformTempo,
  analyseRhythm,
  locate,
} from '@musicpal/music';
import { RhythmContextProvider } from '../context/rhythm.context';
import { useTickerWorker } from '../hooks/useTicker';
import { TempoTicker } from './TempoTicker';

export interface RhythmPlayerProps {
  rhythm: Rhythm;
  isRunning: boolean;
  children: React.ReactNode;
}

export function RhythmPlayer(props: RhythmPlayerProps) {
  const { rhythm, isRunning, children } = props;

  const [currMeasureIndex, setCurrMeasureIndex] = useState(0);
  const [currMeasureOffset, setCurrMeasureOffset] = useState(0);
  const [currBeatIndex, setCurrBeatIndex] = useState(0);
  const [currNoteIndex, setCurrNoteIndex] = useState(0);

  const worker = useTickerWorker();
  const { beatCount, ticksPerBeat, tempos } = useMemo(() => {
    return analyseRhythm(rhythm);
  }, [rhythm]);

  const tickers = useMemo(() => {
    let delay = 0;

    return tempos.map((tempo) => {
      const ticker = {
        tempo,
        delay,
        interval: (60 * 1000) / (ticksPerBeat * tempo.speed),
        count: ticksPerBeat * beatCount,
      };

      delay = delay + (beatCount * 60 * 1000) / tempo.speed;

      return ticker;
    });
  }, [tempos, beatCount, ticksPerBeat]);

  const handleTick = useCallback(
    (tick: number, tempo: UniformTempo) => {
      const {
        currMeasureIndex,
        currMeasureOffset,
        currBeatIndex,
        currNoteIndex,
      } = locate(rhythm, ticksPerBeat, tempo.speed, tick);
      setCurrMeasureIndex(currMeasureIndex);
      setCurrMeasureOffset(currMeasureOffset);
      setCurrBeatIndex(currBeatIndex);
      setCurrNoteIndex(currNoteIndex);
    },
    [
      rhythm,
      ticksPerBeat,
      setCurrMeasureIndex,
      setCurrMeasureOffset,
      setCurrBeatIndex,
      setCurrNoteIndex,
    ],
  );

  return (
    <RhythmContextProvider
      editable={!isRunning}
      currMeasureIndex={currMeasureIndex}
      currMeasureOffset={currMeasureOffset}
      currBeatIndex={currBeatIndex}
      currNoteIndex={currNoteIndex}
    >
      {isRunning
        ? tickers.map((ticker, index) => {
            return (
              <TempoTicker
                key={index}
                worker={worker}
                tempo={ticker.tempo}
                delay={ticker.delay}
                interval={ticker.interval}
                count={ticker.count}
                onTick={handleTick}
              />
            );
          })
        : null}
      {children}
    </RhythmContextProvider>
  );
}
