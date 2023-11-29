import React, { useCallback, useMemo, useState } from 'react';
import { useSoundAnalyser } from '@musicpal/common';
import { Instrument, instruments } from '../utils/instruments';
import { Flex, Select, Tag } from 'antd';
import { Localized } from '@fluent/react';
import { stringifyNoteName } from '@musicpal/music';
import './Tuner.css';

export function Tuner() {
  const { note } = useSoundAnalyser({
    isRunning: true,
  });

  const [instrument, setInstrument] = useState<Instrument>(instruments[0]);

  const options = useMemo(() => {
    return instruments.map((instrument) => {
      return {
        value: instrument.name,
        label: <Localized id={instrument.name}>{instrument.name}</Localized>,
      };
    });
  }, [instruments]);

  const changeInstrument = useCallback(
    (instrumentName: string) => {
      const instrument: Instrument | undefined = instruments.find(
        (instrument) => {
          return instrument.name === instrumentName;
        },
      );

      if (instrument) {
        setInstrument(instrument);
      }
    },
    [instruments],
  );

  return (
    <div className="tuner">
      <Flex className="notes" align="center" justify="space-evenly">
        {instrument.notes.map((note, index) => {
          return (
            <Tag className="note" key={index}>
              {stringifyNoteName(note.name)}
            </Tag>
          );
        })}
      </Flex>
      <div className="instruments">
        <Select
          defaultValue={instrument.name}
          options={options}
          onChange={changeInstrument}
        />
      </div>
    </div>
  );
}
