import React from "react";
import { Button, ButtonProps } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Dynamics, Note } from "../utils/music";
import "./NoteButton.css";

export interface NoteButtonProps {
  note: Note;
  isCurrent: boolean;
}

const types: Record<Dynamics, ButtonProps["type"]> = {
  [Dynamics.Strong]: "primary",
  [Dynamics.Light]: "dashed",
  [Dynamics.None]: "default",
};

export function NoteButton(props: NoteButtonProps) {
  const { note, isCurrent } = props;

  return (
    <Button
      title="note"
      icon={<BellOutlined />}
      className={`button--note note--${note.dynamics} ${
        isCurrent ? "button--active" : ""
      }`}
      disabled={note.dynamics === Dynamics.None}
      type={types[note.dynamics]}
    />
  );
}
