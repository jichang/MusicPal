import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Flex, Typography, Switch } from 'antd';
import { Localized } from '@fluent/react';
import { useAudio } from '../context/audio.context';
import { generateRandomNote } from '../utils/note';
import {
  QuestionOutlined,
  PlayCircleOutlined,
  SwitcherOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import './SightEar.css';
import { getNoteFrenquency, stringifyNote } from '@musicpal/music';

export function SightEar() {
  const { audioContext } = useAudio();

  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
    };
  }, []);

  const [isNoteShown, setIsNoteShown] = useState(false);
  const [note, setNote] = useState(generateRandomNote);

  const changeNote = useCallback(() => {
    setNote(generateRandomNote());
  }, [setNote, setIsNoteShown]);

  const playNote = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    const oscillator = new OscillatorNode(audioContext, {
      frequency: getNoteFrenquency(note),
    });
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillatorRef.current = oscillator;
  }, [audioContext, note]);

  const stopNote = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
  }, []);

  const toggleIsNoteShown = useCallback(() => {
    setIsNoteShown((isNoteShown) => {
      return !isNoteShown;
    });
  }, [setIsNoteShown]);

  const startSinging = useCallback(() => {}, [audioContext, note]);

  const stopSinging = useCallback(() => {}, [audioContext]);

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
            <Typography.Title className="note__name">
              {stringifyNote(note)}
            </Typography.Title>
          ) : (
            <Typography.Title className="note__name">
              <QuestionOutlined />
            </Typography.Title>
          )}
        </div>
        <div>
          <Button
            icon={<AudioOutlined />}
            onPointerDown={startSinging}
            onPointerUp={stopSinging}
          >
            <Localized id="sing">Sing</Localized>
          </Button>
          <Button
            icon={<PlayCircleOutlined />}
            onPointerDown={playNote}
            onPointerLeave={stopNote}
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
