import React, { useCallback, useMemo, useState } from 'react';
import { Rhythm, UniformTempo, analyseRhythm } from '@musicpal/music';
import { RhythmContextProvider } from '../context/rhythm.context';
import { useTickerWorker } from '../hooks/useTicker';
import { TempoTicker } from './TempoTicker';
import { useAudioContext } from '../hooks/useAudioContext';
import { MILLISECONDS_PER_MINUTE } from '@musicpal/common';
import { Tick } from '../utils/ticker';

export interface RhythmPlayerProps {
  rhythm: Rhythm;
  isRunning: boolean;
  onEnd: () => void;
  children: React.ReactNode;
}

export function RhythmPlayer(props: RhythmPlayerProps) {
  const { rhythm, isRunning, onEnd, children } = props;

  const [currMeasureIndex, setCurrMeasureIndex] = useState(-1);
  const [currMeasureOffset, setCurrMeasureOffset] = useState(-1);
  const [currBeatIndex, setCurrBeatIndex] = useState(-1);
  const [currNoteIndex, setCurrNoteIndex] = useState(-1);

  const audioContext = useAudioContext();
  const worker = useTickerWorker();
  const { beatsCount, notesCount, ticksCount, ticksPerBeat, tempos } =
    useMemo(() => {
      return analyseRhythm(rhythm);
    }, [rhythm]);

  const tickers = useMemo(() => {
    if (tempos.length === 0) {
      return [];
    }

    let beginTime =
      rhythm.preparatoryBeats * (MILLISECONDS_PER_MINUTE / tempos[0].speed);

    return tempos.map((tempo) => {
      const preparatoryTime =
        beginTime -
        rhythm.preparatoryBeats * (MILLISECONDS_PER_MINUTE / tempo.speed);
      const ticker = {
        tempo,
        preparatoryTime,
        beginTime,
      };

      beginTime =
        beginTime + beatsCount * (MILLISECONDS_PER_MINUTE / tempo.speed);

      return ticker;
    });
  }, [rhythm.preparatoryBeats, tempos, beatsCount, notesCount, ticksPerBeat]);

  const handleTempoTempoTick = useCallback(
    (tick: Tick, tempo: UniformTempo) => {
      setCurrMeasureIndex(tick.measureIndex);
      setCurrMeasureOffset(tick.measureOffset);
      setCurrBeatIndex(tick.beatIndex);
      setCurrNoteIndex(tick.noteIndex);
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

  const handleTempoEnd = useCallback(
    (tempo: UniformTempo) => {
      if (tempos[tempos.length - 1] === tempo) {
        onEnd();
      }
    },
    [
      tempos,
      setCurrMeasureIndex,
      setCurrMeasureOffset,
      setCurrBeatIndex,
      setCurrNoteIndex,
      onEnd,
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
      {tickers.map((ticker, index) => {
        return (
          <TempoTicker
            key={index}
            audioContext={audioContext}
            worker={worker}
            isRunning={isRunning}
            rhythm={rhythm}
            tempo={ticker.tempo}
            preparatoryTime={ticker.preparatoryTime}
            beginTime={ticker.beginTime}
            ticksPerBeat={ticksPerBeat}
            beatsCount={beatsCount}
            notesCount={notesCount}
            ticksCount={ticksCount}
            onTempoTick={handleTempoTempoTick}
            onTempoEnd={handleTempoEnd}
          />
        );
      })}
      {children}
    </RhythmContextProvider>
  );
}
