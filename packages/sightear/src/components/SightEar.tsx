import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Flex, Typography, Switch, Modal } from 'antd';
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
import { useFlag } from '@musicpal/common';
import { SingingAnalyser } from './SingingAnalyser';

export function SightEar() {
  const { audioContext } = useAudio();

  const oscillatorNodeRef = useRef<OscillatorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const streamSourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    return () => {
      if (oscillatorNodeRef.current) {
        oscillatorNodeRef.current.stop();
        oscillatorNodeRef.current.disconnect();
        oscillatorNodeRef.current = null;
      }

      if (streamSourceNodeRef.current) {
        streamSourceNodeRef.current.disconnect();
        streamSourceNodeRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
      }
    };
  }, []);

  const [isNoteShown, setIsNoteShown] = useState(false);
  const [note, setNote] = useState(generateRandomNote);

  const changeNote = useCallback(() => {
    setNote(generateRandomNote());
  }, [setNote, setIsNoteShown]);

  const playNote = useCallback(() => {
    if (oscillatorNodeRef.current) {
      oscillatorNodeRef.current.stop();
      oscillatorNodeRef.current.disconnect();
      oscillatorNodeRef.current = null;
    }

    const oscillator = new OscillatorNode(audioContext, {
      frequency: getNoteFrenquency(note),
    });
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillatorNodeRef.current = oscillator;
  }, [audioContext, note]);

  const stopNote = useCallback(() => {
    if (oscillatorNodeRef.current) {
      oscillatorNodeRef.current.stop();
      oscillatorNodeRef.current.disconnect();
      oscillatorNodeRef.current = null;
    }
  }, []);

  const toggleIsNoteShown = useCallback(() => {
    setIsNoteShown((isNoteShown) => {
      return !isNoteShown;
    });
  }, [setIsNoteShown]);

  const {
    flag: isSiningModalShown,
    turnOn: openSingingModal,
    turnOff: closeSingingModal,
  } = useFlag(false);

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
          <Button icon={<AudioOutlined />} onClick={openSingingModal}>
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

      <Modal
        open={isSiningModalShown}
        destroyOnClose
        onCancel={closeSingingModal}
        footer={null}
      >
        <SingingAnalyser note={note} />
      </Modal>
    </div>
  );
}
