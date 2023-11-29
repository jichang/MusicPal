import React, { useCallback, useMemo, useState } from 'react';
import { useSoundAnalyser } from '@musicpal/common';
import { Instrument, instruments } from '../utils/instruments';
import { Flex, Select, Tag, Typography } from 'antd';
import { Localized } from '@fluent/react';
import { getInterval, stringifyNote } from '@musicpal/music';
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

  const closest = useMemo(() => {
    if (!note) {
      return undefined;
    }

    let closestNote = instrument.notes[0];
    let closestInterval = getInterval(note, closestNote);
    for (const currNote of instrument.notes) {
      const interval = getInterval(note, currNote);
      if (Math.abs(interval) < Math.abs(closestInterval)) {
        closestInterval = interval;
        closestNote = currNote;
      }
    }

    return { note: closestNote, interval: closestInterval };
  }, [note, instrument]);

  return (
    <div className="tuner">
      <div className="input">
        <Typography.Title className="note__name">
          {note ? stringifyNote(note) : '-'}
        </Typography.Title>
      </div>
      <Flex className="notes" align="center" justify="space-evenly">
        {instrument.notes.map((note, index) => {
          let color = undefined;
          if (closest) {
            const isClosest = note === closest.note;
            if (isClosest) {
              if (closest.interval === 0) {
                color = 'green';
              } else if (closest.interval > 0) {
                color = 'red';
              } else if (closest.interval < 0) {
                color = 'yellow';
              }
            }
          }

          return (
            <Tag className="note" key={index} color={color}>
              {stringifyNote(note)}
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
