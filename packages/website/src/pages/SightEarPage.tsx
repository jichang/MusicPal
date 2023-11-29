import React, { useCallback, useEffect, useState } from 'react';
import './SightEarPage.css';
import { GoBack } from '../components/GoBack';
import { Typography } from 'antd';
import { Localized } from '@fluent/react';
import { SightEar, AudioContextProvider } from '@musicpal/sightear';

export function SightEarPage() {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();

  const createAudioContext = useCallback(async () => {
    const audioContext = new AudioContext();
    setAudioContext(audioContext);
  }, [setAudioContext]);

  useEffect(() => {
    return () => {
      if (audioContext?.state === 'running') {
        audioContext?.close();
      }
    };
  }, [audioContext]);

  return (
    <div className="page page--sightear">
      <div className="page__header">
        <GoBack />
      </div>
      <div className="page__content">
        <AudioContextProvider
          audioContext={audioContext}
          description={
            <Typography.Paragraph>
              <Localized id="this-app-needs-to-access-mic-and-speaker">
                This app needs to access your mic and speaker.
              </Localized>
            </Typography.Paragraph>
          }
          onStart={createAudioContext}
        >
          <SightEar />
        </AudioContextProvider>
      </div>
    </div>
  );
}
