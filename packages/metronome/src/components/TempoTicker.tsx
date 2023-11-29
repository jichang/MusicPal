import { Rhythm, UniformTempo, locateNextBeat } from '@musicpal/music';
import { useEffect, useRef } from 'react';
import * as Comlink from 'comlink';
import { Tick, TickerEvent, TickerTask, TickerWorker } from '../utils/ticker';
import { MILLISECONDS_PER_MINUTE, getId } from '@musicpal/common';
import { scheduleFirstBeat, scheduleBeat } from '../utils/tone';

export interface TempoTickerProps {
  worker: Comlink.Remote<TickerWorker>;
  audioContext: AudioContext;
  isRunning: boolean;
  rhythm: Rhythm;
  tempo: UniformTempo;
  preparatoryTime: number;
  beginTime: number;
  ticksPerBeat: number;
  beatsCount: number;
  notesCount: number;
  ticksCount: number;
  onTempoPrepare?: (tempo: UniformTempo) => void;
  onTempoStart?: (tempo: UniformTempo) => void;
  onTempoTick?: (tick: Tick, tempo: UniformTempo) => void;
  onTempoEnd?: (tempo: UniformTempo) => void;
}

export function TempoTicker(props: TempoTickerProps) {
  const {
    audioContext,
    worker,
    isRunning,
    rhythm,
    beatsCount,
    notesCount,
    ticksCount,
    preparatoryTime,
    beginTime,
    ticksPerBeat,
    tempo,
    onTempoPrepare,
    onTempoStart,
    onTempoTick,
    onTempoEnd,
  } = props;

  const onTempoPrepareRef = useRef(onTempoPrepare);
  onTempoPrepareRef.current = onTempoPrepare;
  const onTempoStartRef = useRef(onTempoStart);
  onTempoStartRef.current = onTempoStart;
  const onTempoTickRef = useRef(onTempoTick);
  onTempoTickRef.current = onTempoTick;
  const onTempoEndRef = useRef(onTempoEnd);
  onTempoEndRef.current = onTempoEnd;

  useEffect(() => {
    if (isRunning && rhythm && tempo) {
      const id = `Tick.${getId()}`;
      const task: TickerTask = {
        id,
        rhythm,
        preparatoryTime,
        beginTime,
        tempo,
        ticksCount,
        ticksPerBeat,
      };

      const beatInterval = MILLISECONDS_PER_MINUTE / tempo.speed;

      let startTime = audioContext.currentTime + beginTime / 1000;
      const handleTick = Comlink.proxy(
        (event: TickerEvent, task: TickerTask) => {
          switch (event.type) {
            case 'preparatory':
              scheduleFirstBeat(
                audioContext,
                rhythm,
                startTime,
                beatInterval / 1000,
              );
              onTempoPrepareRef.current?.(tempo);
              break;
            case 'tick':
              {
                const { tick } = event;
                if (
                  tick.measureOffset === 0 &&
                  tick.beatIndex === 0 &&
                  tick.noteIndex === 0
                ) {
                  onTempoStartRef.current?.(tempo);
                }

                if (tick.noteIndex === 0) {
                  const location = locateNextBeat(
                    rhythm,
                    tick.measureIndex,
                    tick.measureOffset,
                    tick.beatIndex,
                    tick.beatOffset,
                  );
                  if (location) {
                    scheduleBeat(
                      audioContext,
                      rhythm,
                      startTime,
                      location.measureIndex,
                      location.beatIndex,
                      location.beatOffset,
                      beatInterval / 1000,
                    );
                  }
                }

                onTempoTickRef.current?.(tick, tempo);

                if (
                  tick.beatOffset === beatsCount - 1 &&
                  tick.noteOffset === notesCount - 1
                ) {
                  onTempoEndRef.current?.(tempo);
                  worker.stopTask(task);
                }
              }
              break;
          }
        },
      );

      worker.startTask(task, handleTick);

      return () => {
        worker.stopTask(task);
      };
    }
  }, [
    audioContext,
    worker,
    isRunning,
    rhythm,
    preparatoryTime,
    beginTime,
    tempo,
    beatsCount,
    notesCount,
    ticksCount,
    ticksPerBeat,
  ]);

  return null;
}
