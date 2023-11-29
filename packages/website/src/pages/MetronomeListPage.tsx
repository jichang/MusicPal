import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import './MetronomeListPage.css';
import { Button, Input, Modal, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { PersonalRhythmList } from '../components/metronome/PersonalRhythmList';
import { DefaultRhythmList } from '../components/metronome/DefaultRhythmList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Localized } from '@fluent/react';
import { GoBack } from '../components/GoBack';
import { useFlag } from '../hooks/useFlag';
import { useStorage } from '../components/storage.context';
import { Form, FormField } from '@musicpal/metronome';
import { DEFAULT_MEASURES, Rhythm, UNIFORM_BPM_60 } from '@musicpal/music';

type FieldType = {
  name?: string;
};

export type TabsItems = TabsProps['items'];

export function MetronomeListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    flag: isRhythmNameModalOpened,
    turnOn: openRhythmNameModal,
    turnOff: closeRhythmNameModal,
  } = useFlag(false);

  const items: TabsItems = [
    {
      key: 'personal',
      label: <Localized id="personal">Personal</Localized>,
      children: <PersonalRhythmList onCreateRhythm={openRhythmNameModal} />,
    },
    {
      key: 'default',
      label: <Localized id="default">Default</Localized>,
      children: <DefaultRhythmList />,
    },
  ];

  const handleTabChanged = useCallback(
    (activeKey: string) => {
      setSearchParams({ tabkey: activeKey }, { replace: true });
    },
    [setSearchParams],
  );

  const [rhythmName, setRhythmName] = useState('');

  const changeRhythmName = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setRhythmName(evt.target.value);
    },
    [setRhythmName],
  );

  const { dexie } = useStorage();
  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState(false);

  const createRhythm = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();

      const id = `${Date.now()}.${Math.random()}`;
      const rhythm: Rhythm = {
        id,
        category: 'personal',
        name: rhythmName,
        order: Date.now(),
        tempo: UNIFORM_BPM_60,
        measures: DEFAULT_MEASURES,
      };

      setIsCreating(true);

      dexie.rhythms.add(rhythm).then(
        () => {
          setIsCreating(false);
          navigate(`/metronome/${id}`);
        },
        () => {
          setIsCreating(false);
        },
      );
    },
    [rhythmName, dexie, navigate, setIsCreating],
  );

  return (
    <div className="page page--metronome">
      <div className="page__header">
        <GoBack />
      </div>
      <div className="page__content">
        <Tabs
          activeKey={searchParams.get('tabkey') || 'personal'}
          items={items}
          onChange={handleTabChanged}
        />
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
