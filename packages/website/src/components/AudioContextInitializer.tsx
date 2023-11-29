import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Localized } from '@fluent/react';
import { Button, Flex, Typography } from 'antd';
import { WebAudioContext } from '@musicpal/common';

import './AudioContextInitializer.css';
import { useAppContext } from './app.context';

export interface ToneContextProviderProps {
  children: React.ReactNode;
}

export function AudioContextInitializer(props: ToneContextProviderProps) {
  const { children } = props;

  const { audioContext, setupAudioContext } = useAppContext();

  if (!audioContext) {
    return (
      <Flex
        className="audio__context__initializer"
        justify="center"
        align="center"
        vertical
      >
        <InfoCircleOutlined className="icon" />
        <Typography.Paragraph>
          <Localized id="this-app-needs-to-access-mic-and-speaker">
            This app needs to access your mic and speaker.
          </Localized>
        </Typography.Paragraph>
        <Button type="primary" onClick={setupAudioContext}>
          <Localized id="start">Start</Localized>
        </Button>
      </Flex>
    );
  }

  return (
    <WebAudioContext.Provider value={{ audioContext }}>
      {children}
    </WebAudioContext.Provider>
  );
}
