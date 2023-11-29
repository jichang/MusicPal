import React, { useCallback, useState } from "react";
import { Button, Dropdown, Space, List, MenuProps } from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Localized } from "@fluent/react";
import "./MetronomeCreatePage";
import { Link } from "react-router-dom";

export function MetronomeCreatePage() {
  const [name, setName] = useState("");
  const [measures, setMeasures] = useState("");

  return (
    <div className="page page--metronome-create">
      <Space className="page__header">
        <Link to="/metronome">
          <ArrowLeftOutlined />
          <Localized id="back">Back</Localized>
        </Link>
        <Space>{name}</Space>
        <Button type="primary" icon={<SaveOutlined />}>
          <Localized id="save">Save</Localized>
        </Button>
      </Space>
      <div className="page__content">
        <Button type="primary" icon={<PlusOutlined />}>
          Add Measure
        </Button>
      </div>
    </div>
  );
}
