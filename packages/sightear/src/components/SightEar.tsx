import React, { useCallback, useState } from 'react';
import { Button, Flex, Typography, Switch } from 'antd';
import { Localized } from '@fluent/react';
import { useTone } from '../context/tone.context';
import { generateRandomNote } from '../utils/note';
import {
  QuestionOutlined,
  PlayCircleOutlined,
  SwitcherOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import './SightEar.css';

export function SightEar() {
  const { synth } = useTone();

  const [isNoteShown, setIsNoteShown] = useState(false);
  const [note, setNote] = useState(generateRandomNote);

  const changeNote = useCallback(() => {
    setNote(generateRandomNote());
  }, [setNote, setIsNoteShown]);

  const playNote = useCallback(() => {
    synth.triggerAttack(note);
  }, [synth, note]);

  const stopNote = useCallback(() => {
    synth.triggerRelease();
  }, [synth]);

  const toggleIsNoteShown = useCallback(() => {
    setIsNoteShown((isNoteShown) => {
      return !isNoteShown;
    });
  }, [setIsNoteShown]);

  return (
    <div className="sight-ear">
      <Flex vertical align="center" justify="center">
        <div>
          <Switch
            checked={isNoteShown}
            checkedChildren={<Localized id="show-note">Show Note</Localized>}
            unCheckedChildren={<Localized id="hide-note">Hide Note</Localized>}
            onChange={toggleIsNoteShown}
          />
        </div>
        <div>
          {isNoteShown ? (
            <Typography.Title className="note__name">{note}</Typography.Title>
          ) : (
            <Typography.Title className="note__name">
              <QuestionOutlined />
            </Typography.Title>
          )}
        </div>
        <div>
          <Button
            icon={<AudioOutlined />}
            onPointerDown={playNote}
            onPointerUp={stopNote}
          >
            <Localized id="sing">Sing</Localized>
          </Button>
          <Button
            icon={<PlayCircleOutlined />}
            onPointerDown={playNote}
            onPointerUp={stopNote}
          >
            <Localized id="play">Play</Localized>
          </Button>
          <Button icon={<SwitcherOutlined />} onClick={changeNote}>
            <Localized id="change">Change</Localized>
          </Button>
        </div>
      </Flex>
    </div>
  );
}
