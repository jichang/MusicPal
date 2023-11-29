import React from 'react';
import './SightEarPage.css';
import { GoBack } from '../components/GoBack';
import { SightEar } from '@musicpal/sightear';
import { AudioContextInitializer } from '../components/AudioContextInitializer';

export function SightEarPage() {
  return (
    <div className="page page--sightear">
      <div className="page__header">
        <GoBack />
      </div>
      <div className="page__content">
        <AudioContextInitializer>
          <SightEar />
        </AudioContextInitializer>
      </div>
    </div>
  );
}
