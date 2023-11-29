import { Dynamics, Note, Rhythm, UniformTempo } from '@musicpal/music';
import { useEffect } from 'react';
import * as Comlink from 'comlink';
import { TickerTask, TickerWorker } from '../utils/ticker';
import { getId } from '@musicpal/common';

export const frequencies: Record<Dynamics, number> = {
  [Dynamics.Accent]: 1000,
  [Dynamics.Light]: 500,
  [Dynamics.None]: 0,
  [Dynamics.Invalid]: 0,
};

export interface TempoTickerProps {
  worker: Comlink.Remote<TickerWorker>;
  audioContext: AudioContext;
  isRunning: boolean;
  rhythm: Rhythm;
  tempo: UniformTempo;
  delay: number;
  interval: number;
  ticksPerBeat: number;
  count: number;
  onTick: (tick: number, tempo: UniformTempo) => void;
}

export function TempoTicker(props: TempoTickerProps) {
  const {
    audioContext,
    worker,
    isRunning,
    rhythm,
    count,
    delay,
    interval,
    ticksPerBeat,
    tempo,
    onTick,
  } = props;

  useEffect(() => {
    if (isRunning && interval && tempo) {
      const id = `Tick.${getId()}`;
      const task: TickerTask = {
        id,
        delay,
        interval,
      };

      let ticks = 0;
      const handleInterval = Comlink.proxy(() => {
        if (ticks < count) {
          onTick(ticks, tempo);
          ticks++;
        } else {
          worker.stopTask(task);
        }
      });

      worker.startTask(task, handleInterval);

      const scheduleNote = (time: number, note: Note) => {
        const osc = audioContext.createOscillator();
        const envelope = audioContext.createGain();

        osc.frequency.value = frequencies[note.dynamics];
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(audioContext.destination);

        osc.start(time);
        osc.stop(time + 0.03);
      };

      const startTime = audioContext.currentTime;
      let timeoutId: number | null = null;
      let intervalId: number | null = null;
      const beatInterval = interval * ticksPerBeat;
      let measureIndex = 0;
      let measureOffset = 0;
      let beatIndex = 0;
      let beatCount = 0;

      const schedule = () => {
        let measure = rhythm.measures[measureIndex];
        if (!measure) {
          if (intervalId) {
            window.clearInterval(intervalId);
            intervalId = null;
          }
          return;
        }

        const beat = measure.beats[beatIndex];
        for (let i = 0; i < beat.notes.length; i++) {
          const note = beat.notes[i];
          const time =
            startTime * 1000 +
            delay +
            beatCount * beatInterval +
            1000 * ((beatInterval / beat.notes.length) * i);
          scheduleNote(time / 1000, note);
        }

        beatIndex++;
        beatCount++;

        if (beatIndex >= measure.beats.length) {
          beatIndex = 0;
          measureOffset++;
        }

        if (measureOffset >= measure.repeat) {
          measureOffset = 0;
          measureIndex++;
        }
      };

      const startSchedule = () => {
        timeoutId = null;

        intervalId = window.setInterval(schedule, interval * ticksPerBeat);
      };

      timeoutId = window.setTimeout(startSchedule, delay - beatInterval);

      return () => {
        worker.stopTask(task);

        if (timeoutId) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (intervalId) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
      };
    }
  }, [
    audioContext,
    worker,
    isRunning,
    rhythm,
    count,
    delay,
    tempo,
    interval,
    ticksPerBeat,
    onTick,
  ]);

  return null;
}
