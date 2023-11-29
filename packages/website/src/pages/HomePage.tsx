import React, { useCallback } from 'react';
import { Button, Dropdown, List, MenuProps } from 'antd';
import { ArrowRightOutlined, TranslationOutlined } from '@ant-design/icons';
import { Localized } from '@fluent/react';
import './HomePage.css';
import { useAppContext } from '../components/app.context';
import { RESOURCES_LABELS } from '../i18n';
import { Link } from 'react-router-dom';

export function HomePage() {
  const items: MenuProps['items'] = [
    {
      label: RESOURCES_LABELS['en-US'],
      key: 'en-US',
    },
    {
      label: RESOURCES_LABELS['zh-CN'],
      key: 'zh-CN',
    },
  ];

  const { locale, changeLocale } = useAppContext();
  const handleLocaleChanged = useCallback(
    ({ key }: { key: string }) => {
      changeLocale(key);
    },
    [changeLocale],
  );

  return (
    <div className="page page--home">
      <div className="page__header">
        <Dropdown
          menu={{
            items,
            onClick: handleLocaleChanged,
          }}
        >
          <Button icon={<TranslationOutlined />}>
            {RESOURCES_LABELS[locale]}
          </Button>
        </Dropdown>
      </div>
      <div className="page__content">
        <List bordered>
          <List.Item
            actions={[
              <Link to="/metronome">
                <ArrowRightOutlined />
                <Localized id="open">Open</Localized>
              </Link>,
            ]}
          >
            <List.Item.Meta
              title={<Localized id="metronome" />}
              description={<Localized id="metronome-description" />}
            />
          </List.Item>
          <List.Item
            actions={[
              <Link to="/sightear">
                <ArrowRightOutlined />
                <Localized id="open">Open</Localized>
              </Link>,
            ]}
          >
            <List.Item.Meta
              title={<Localized id="sightear" />}
              description={<Localized id="sightear-description" />}
            />
          </List.Item>
          <List.Item
            actions={[
              <Link to="/tuner">
                <ArrowRightOutlined />
                <Localized id="open">Open</Localized>
              </Link>,
            ]}
          >
            <List.Item.Meta
              title={<Localized id="tuner" />}
              description={<Localized id="tuner-description" />}
            />
          </List.Item>
        </List>
      </div>
    </div>
  );
}
