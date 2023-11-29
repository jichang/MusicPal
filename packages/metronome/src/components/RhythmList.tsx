import React from "react";
import "./RhythmList.css";
import { Button, List } from "antd";
import { Rhythm } from "../utils/music";
import { EditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Link } from "react-router-dom";

export interface RhythmListProps {
  rhythms: Rhythm[];
}

export function RhythmList(props: RhythmListProps) {
  const { rhythms } = props;

  return (
    <List
      bordered
      dataSource={rhythms}
      renderItem={(rhythm: Rhythm) => {
        const actions = [
          <Link to={`/metronome/${rhythm.id}`}>
            <PlayCircleOutlined />
            <Localized id="play">Play</Localized>
          </Link>,
        ];
        const isDefault = rhythm.category === "default";
        if (!isDefault) {
          actions.splice(0, 0, <Button icon={<EditOutlined />}>Edit</Button>);
        }

        return (
          <List.Item actions={actions}>
            <List.Item.Meta
              title={
                isDefault ? (
                  <Localized id={rhythm.name}>{rhythm.name}</Localized>
                ) : (
                  rhythm.name
                )
              }
            />
          </List.Item>
        );
      }}
    />
  );
}
