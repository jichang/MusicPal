import React from 'react';
import './TunerPage.css';
import { GoBack } from '../components/GoBack';
import { Tuner } from '@musicpal/tuner';
import { AudioContextInitializer } from '../components/AudioContextInitializer';

export function TunerPage() {
  return (
    <div className="page page--tuner">
      <div className="page__header">
        <GoBack />
      </div>
      <div className="page__content">
        <AudioContextInitializer>
          <Tuner />
        </AudioContextInitializer>
      </div>
    </div>
  );
}
