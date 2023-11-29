import { Note, getNoteFrenquency, stringifyNote } from '@musicpal/music';
import './SingingAnalyser.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAudio } from '../context/audio.context';
import { Typography } from 'antd';

export interface SingingAnalyserProps {
  note: Note;
}

export function SingingAnalyser(props: SingingAnalyserProps) {
  const { note } = props;
  const { audioContext } = useAudio();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function init() {
      let mediaStream: MediaStream | null = null;
      let stream: MediaStreamAudioSourceNode | null = null;
      let analyser: AnalyserNode | null = null;
      let animationHandle: number | null = null;

      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((_mediaStream) => {
          mediaStream = _mediaStream;
          analyser = audioContext.createAnalyser();
          stream = audioContext.createMediaStreamSource(mediaStream);
          stream.connect(analyser);

          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Float32Array(bufferLength);

          const update = () => {
            if (analyser) {
              animationHandle = requestAnimationFrame(update);

              if (canvasRef.current) {
                const canvas = canvasRef.current;
                analyser.getFloatFrequencyData(dataArray);
                const canvasCtx = canvas.getContext('2d');
                if (canvasCtx) {
                  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                  const barWidth = (canvas.width / bufferLength) * 2.5;
                  let posX = 0;
                  for (let i = 0; i < bufferLength; i++) {
                    const barHeight = (dataArray[i] + 140) * 2;
                    canvasCtx.fillStyle =
                      'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
                    canvasCtx.fillRect(
                      posX,
                      canvas.height - barHeight / 2,
                      barWidth,
                      barHeight / 2,
                    );
                    posX += barWidth + 1;
                  }
                }
              }
            }
          };

          update();
        });

      return () => {
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

    return init();
  }, [audioContext]);

  return (
    <div className="singing-analyser">
      <Typography.Title className="note__name">
        {stringifyNote(note)}
      </Typography.Title>
      <canvas ref={canvasRef} width={320} height={480} />
    </div>
  );
}
