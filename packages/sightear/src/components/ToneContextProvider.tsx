import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Localized } from '@fluent/react';
import { Button, Flex } from 'antd';
import * as Tone from 'tone';
import { ToneContext } from '../context/tone.context';

import './ToneContextProvider.css';

export interface ToneContextProviderProps {
  description: React.ReactNode;
  synth: Tone.Synth | undefined;
  onStart: () => void;
  children: React.ReactNode;
}

export function ToneContextProvider(props: ToneContextProviderProps) {
  const { children, description, onStart, synth } = props;

  if (!synth) {
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
    <ToneContext.Provider value={{ synth }}>{children}</ToneContext.Provider>
  );
}
