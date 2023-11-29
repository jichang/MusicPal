import React, { useCallback } from "react";
import { Button, Dropdown, List, MenuProps } from "antd";
import {
  ArrowLeftOutlined,
  PlaySquareOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { Localized } from "@fluent/react";
import "./MetronomePlayerPage.css";
import { Link } from "react-router-dom";

export function MetronomePlayerPage() {
  return (
    <div className="page page--metronome-player">
      <div className="page__header">
        <Link to="/metronome">
          <ArrowLeftOutlined />
          <Localized id="back">Back</Localized>
        </Link>
      </div>
      <div className="page__content"></div>
    </div>
  );
}
