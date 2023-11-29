import { useEffect, useState } from 'react';
import { useAudio } from '../context/audio.context';
import {
  Dynamics,
  Note,
  detectPitch,
  getNoteFromFrequency,
} from '@musicpal/music';

export interface UseSoundAnalyserOptions {
  isRunning: boolean;
}

export function useSoundAnalyser(options: UseSoundAnalyserOptions) {
  const { isRunning } = options;
  const { audioContext } = useAudio();

  const [note, setNote] = useState<Note>();

  useEffect(() => {
    function init() {
      let mediaStream: MediaStream | null = null;
      let stream: MediaStreamAudioSourceNode | null = null;
      let analyser: AnalyserNode | null = null;
      let animationHandle: number | null = null;

      let ignored = false;
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((_mediaStream) => {
          if (ignored) {
            return;
          }

          mediaStream = _mediaStream;
          analyser = audioContext.createAnalyser();
          stream = audioContext.createMediaStreamSource(mediaStream);
          stream.connect(analyser);

          analyser.fftSize = 2048;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Float32Array(bufferLength);

          const update = () => {
            if (ignored) {
              return;
            }

            if (analyser) {
              animationHandle = requestAnimationFrame(update);

              analyser.getFloatTimeDomainData(dataArray);
              const frequency = detectPitch(dataArray, audioContext.sampleRate);
              let note: Note | undefined = undefined;
              if (frequency !== -1) {
                note = getNoteFromFrequency(frequency, Dynamics.Accent);
              }

              setNote(note);
            }
          };

          update();
        });

      return () => {
        ignored = true;

        if (animationHandle) {
          cancelAnimationFrame(animationHandle);
          animationHandle = null;
        }

        if (stream) {
          stream.disconnect();
          stream = null;
        }

        if (analyser) {
          analyser.disconnect();
          analyser = null;
        }

        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => {
            track.stop();
          });
          mediaStream = null;
        }
      };
    }

    if (isRunning) {
      return init();
    }
  }, [isRunning, audioContext, setNote]);

  return { note };
}
