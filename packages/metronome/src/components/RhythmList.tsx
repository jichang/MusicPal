import React from "react";
import "./RhythmList.css";
import { Button, List } from "antd";
import { Rhythm } from "../utils/music";
import { EditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";

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
          <Button
            icon={<PlayCircleOutlined />}
            type="link"
            href={`/metronome/${rhythm.id}`}
          >
            <Localized id="play">Play</Localized>
          </Button>,
        ];
        if (rhythm.category !== "default") {
          actions.splice(0, 0, <Button icon={<EditOutlined />}>Edit</Button>);
        }

        return (
          <List.Item actions={actions}>
            <List.Item.Meta title={rhythm.name} />
          </List.Item>
        );
      }}
      locale={{
        emptyText: <Localized id="no-rhythms" />,
      }}
    />
  );
}
