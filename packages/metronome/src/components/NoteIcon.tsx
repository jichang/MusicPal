import React, { useCallback } from 'react';
import { Button, ButtonProps } from 'antd';
import {
  AudioFilled,
  AudioMutedOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import './NoteIcon.css';
import { Dynamics, Note } from '@musicpal/music';
import classNames from 'classnames';

export interface NoteButtonProps {
  index: number;
  note: Note;
  isCurrent: boolean;
  onClick: (index: number) => void;
}

export function NoteIcon(props: NoteButtonProps) {
  const { index, note, isCurrent, onClick } = props;

  const handleOnClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  const classes = classNames('note__icon', {
    'note__icon--current': isCurrent,
  });

  switch (note.dynamics) {
    case Dynamics.None:
      return (
        <AudioMutedOutlined
          role="button"
          className={classes}
          onClick={handleOnClick}
        />
      );
    case Dynamics.Light:
      return (
        <AudioOutlined
          role="button"
          className={classes}
          onClick={handleOnClick}
        />
      );
    case Dynamics.Accent:
      return (
        <AudioFilled
          role="button"
          className={classes}
          onClick={handleOnClick}
        />
      );
    default:
      return null;
  }
}
