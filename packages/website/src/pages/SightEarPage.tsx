import React, { useCallback, useState } from 'react';
import './SightEarPage.css';
import { GoBack } from '../components/GoBack';
import { Typography } from 'antd';
import { Localized } from '@fluent/react';
import { SightEar, ToneContextProvider } from '@musicpal/sightear';
import * as Tone from 'tone';

export function SightEarPage() {
  const [synth, setSynth] = useState<Tone.Synth | undefined>();

  const createSynth = useCallback(async () => {
    await Tone.start();
    setSynth(new Tone.Synth().toDestination());
  }, [setSynth]);

  return (
    <div className="page page--sightear">
      <div className="page__header">
        <GoBack />
      </div>
      <div className="page__content">
        <ToneContextProvider
          synth={synth}
          description={
            <Typography.Paragraph>
              <Localized id="this-app-needs-to-access-mic-and-speaker">
                This app needs to access your mic and speaker.
              </Localized>
            </Typography.Paragraph>
          }
          onStart={createSynth}
        >
          <SightEar />
        </ToneContextProvider>
      </div>
    </div>
  );
}
