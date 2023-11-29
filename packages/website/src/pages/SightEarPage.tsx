import React from 'react';
import './SightEarPage.css';
import { GoBack } from '../components/GoBack';
import { Tabs } from 'antd';
import { TabsItems } from './MetronomeListPage';
import { Localized } from '@fluent/react';
import { SightSinging, EarTraining } from '@musicpal/sightear';

export function SightEarPage() {
  const tabItems: TabsItems = [
    {
      key: 'sight-singing',
      label: <Localized id="sight-singing">Sight Singing</Localized>,
      children: <SightSinging />,
    },
    {
      key: 'ear-traning',
      label: <Localized id="ear-training">Ear Training</Localized>,
      children: <EarTraining />,
    },
  ];

  return (
    <div className="page page--sightear">
      <div className="page__header">
        <GoBack />
      </div>
      <div className="page__content">
        <Tabs items={tabItems} />
      </div>
    </div>
  );
}
