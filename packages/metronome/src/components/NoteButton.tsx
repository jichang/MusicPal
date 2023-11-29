import React, { useCallback } from "react";
import { Button, ButtonProps } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Dynamics, Note } from "../utils/music";
import "./NoteButton.css";

export interface NoteButtonProps {
  index: number;
  note: Note;
  isCurrent: boolean;
  onClick: (index: number) => void;
}

const types: Record<Dynamics, ButtonProps["type"] | ""> = {
  [Dynamics.None]: "text",
  [Dynamics.Light]: "dashed",
  [Dynamics.Accent]: "primary",
  [Dynamics.Invalid]: "",
};

export function NoteButton(props: NoteButtonProps) {
  const { index, note, isCurrent, onClick } = props;

  const handleOnClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <Button
      title="note"
      icon={<BellOutlined />}
      className={`button--note note--${note.dynamics} ${
        isCurrent ? "note--active" : ""
      }`}
      type={types[note.dynamics] || undefined}
      onClick={handleOnClick}
    />
  );
}
