import { ArrowLeftOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import { Button } from "antd";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function GoBack() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Button icon={<ArrowLeftOutlined />} onClick={goBack}>
      <Localized id="back">Back</Localized>
    </Button>
  );
}
