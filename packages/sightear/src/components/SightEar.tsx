import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Flex, Typography, Switch, Modal } from 'antd';
import { Localized } from '@fluent/react';
import { useAudio } from '@musicpal/common/src/context/audio.context';
import { generateRandomNote } from '../utils/note';
import {
  QuestionOutlined,
  PlayCircleOutlined,
  SwitcherOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import './SightEar.css';
import { getNoteFrequency, stringifyNote } from '@musicpal/music';
import { useFlag, useSoundAnalyser } from '@musicpal/common';

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
      frequency: getNoteFrequency(note),
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
    flag: isSoundAnalyserModalShown,
    turnOn: openSoundAnalyserModal,
    turnOff: closeSoundAnalyserModal,
  } = useFlag(false);
  const { note: soundNote } = useSoundAnalyser({
    isRunning: isSoundAnalyserModalShown,
  });

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
          <Button icon={<AudioOutlined />} onClick={openSoundAnalyserModal}>
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
        open={isSoundAnalyserModalShown}
        destroyOnClose
        onCancel={closeSoundAnalyserModal}
        footer={null}
        className="sound__analyser__modal"
      >
        <div className="sound__analyser__panel">
          <Typography.Title className="note__name">
            {soundNote ? stringifyNote(soundNote) : '-'}
          </Typography.Title>
        </div>
      </Modal>
    </div>
  );
}
