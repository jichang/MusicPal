import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import './MetronomeListPage.css';
import { Button, Input, Modal } from 'antd';
import type { TabsProps } from 'antd';
import { PersonalRhythmList } from '../components/metronome/PersonalRhythmList';
import { useNavigate } from 'react-router-dom';
import { Localized } from '@fluent/react';
import { GoBack } from '../components/GoBack';
import { useStorage } from '../components/storage.context';
import { Form, FormField } from '@musicpal/metronome';
import { DEFAULT_MEASURES, Rhythm, UNIFORM_BPM_60 } from '@musicpal/music';
import { getId, useFlag } from '@musicpal/common';

export type TabsItems = TabsProps['items'];

export function MetronomeListPage() {
  const {
    flag: isRhythmNameModalOpened,
    turnOn: openRhythmNameModal,
    turnOff: closeRhythmNameModal,
  } = useFlag(false);

  const [rhythmName, setRhythmName] = useState('');

  const changeRhythmName = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setRhythmName(evt.target.value);
    },
    [setRhythmName],
  );

  const { dexie } = useStorage();
  const navigate = useNavigate();

  const createRhythm = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();

      const id = getId();
      const rhythm: Rhythm = {
        id,
        name: rhythmName,
        order: Date.now(),
        createdTime: new Date(),
        updatedTime: new Date(),
        preparatoryBeats: 4,
        tempo: UNIFORM_BPM_60,
        measures: DEFAULT_MEASURES,
      };

      dexie.rhythms.add(rhythm).then(
        () => {
          navigate(`/metronome/${id}`);
        },
        () => {},
      );
    },
    [rhythmName, dexie, navigate],
  );

  return (
    <div className="page page--metronome">
      <div className="page__header">
        <GoBack />
      </div>
      <div className="page__content">
        <PersonalRhythmList onCreateRhythm={openRhythmNameModal} />
      </div>

      <Modal
        title={
          <Localized id="input-name-of-rhythm">Input name of rhythm</Localized>
        }
        open={isRhythmNameModalOpened}
        footer={null}
        onCancel={closeRhythmNameModal}
      >
        <Form autoComplete="off" onSubmit={createRhythm}>
          <FormField name="name" label="name">
            <Localized id="rhythm-name-field" attrs={{ placeholder: true }}>
              <Input
                name="name"
                value={rhythmName}
                onChange={changeRhythmName}
                placeholder="Input name of rhythm"
              />
            </Localized>
          </FormField>
          <FormField name="submit">
            <Button type="primary" htmlType="submit">
              <Localized id="create">Create</Localized>
            </Button>
          </FormField>
        </Form>
      </Modal>
    </div>
  );
}
