import React from "react";
import { Button } from "antd";
import { AudioFilled } from "@ant-design/icons";
import { Note } from "../utils/music";
import "./NoteButton.css";

export interface NoteButtonProps {
  note: Note;
  isCurrent: boolean;
}

export function NoteButton(props: NoteButtonProps) {
  const { note, isCurrent } = props;

  return (
    <Button
      title="note"
      icon={<AudioFilled />}
      className={`note note--${note.dynamics} ${
        isCurrent ? "note--active" : ""
      }`}
    />
  );
}
