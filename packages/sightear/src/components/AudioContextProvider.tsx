import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Localized } from '@fluent/react';
import { Button, Flex } from 'antd';
import { AudioContext } from '@musicpal/common/src/context/audio.context';

import './AudioContextProvider.css';

export interface ToneContextProviderProps {
  description: React.ReactNode;
  audioContext: AudioContext | undefined;
  onStart: () => void;
  children: React.ReactNode;
}

export function AudioContextProvider(props: ToneContextProviderProps) {
  const { children, description, onStart, audioContext } = props;

  if (!audioContext) {
    return (
      <Flex
        className="tone__context__provider"
        justify="center"
        align="center"
        vertical
      >
        <InfoCircleOutlined />
        {description}
        <Button type="primary" onClick={onStart}>
          <Localized id="start">Start</Localized>
        </Button>
      </Flex>
    );
  }

  return (
    <AudioContext.Provider value={{ audioContext }}>
      {children}
    </AudioContext.Provider>
  );
}
