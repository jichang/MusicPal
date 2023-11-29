import React from 'react';
import { List, Card } from 'antd';
import { useLiveQuery } from 'dexie-react-hooks';
import { useStorage } from '../storage.context';
import { Rhythm } from '@musicpal/music';
import { Localized } from '@fluent/react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

export interface DefaultRhythmListProps {}

export function DefaultRhythmList(props: DefaultRhythmListProps) {
  const { dexie } = useStorage();

  const rhythms = useLiveQuery(() => {
    return dexie.rhythms.where('category').equals('default').toArray();
  }, [dexie]);

  return (
    <Card title={<Localized id="rhythms">Rhythms</Localized>}>
      <List
        dataSource={rhythms}
        renderItem={(rhythm: Rhythm) => {
          const actions = [
            <Link to={`/metronome/${rhythm.id}`}>
              <ArrowRightOutlined />
              <Localized id="open">Open</Localized>
            </Link>,
          ];

          return (
            <List.Item actions={actions}>
              <List.Item.Meta
                title={<Localized id={rhythm.name}>{rhythm.name}</Localized>}
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
}
