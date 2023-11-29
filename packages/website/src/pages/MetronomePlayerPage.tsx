import React, { useCallback } from 'react';
import './MetronomePlayerPage.css';
import { GoBack } from '../components/GoBack';
import { useStorage } from '../components/storage.context';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { RhythmEditor } from '../components/metronome/RhythmEditor';
import { Fill } from '../components/Fill';
import { Rhythm } from '@musicpal/music';
import { AudioContextInitializer } from '../components/AudioContextInitializer';

export function MetronomePlayerPage() {
  const { id } = useParams();
  const { dexie } = useStorage();

  const rhythm = useLiveQuery(() => {
    if (id) {
      return dexie.rhythms.get(id);
    }
  }, [dexie, id]);

  const save = useCallback(
    (rhythm: Rhythm) => {
      dexie.rhythms.update(rhythm.id, { ...rhythm, updatedTime: new Date() });
    },
    [dexie],
  );

  return (
    <div className="page page--metronome-player">
      <div className="page__header">
        <GoBack />
        <Fill>
          <p className="page__header__title">{rhythm?.name}</p>
        </Fill>
      </div>
      <div className="page__content">
        <AudioContextInitializer>
          {rhythm ? <RhythmEditor rhythm={rhythm} onSave={save} /> : null}
        </AudioContextInitializer>
      </div>
    </div>
  );
}
