import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "antd";
import { PlaySquareOutlined } from "@ant-design/icons";

export function Home() {
  return (
    <div className="page">
      <Row>
        <Col xs={24} sm={12} md={8} lg={4} xl={4}>
          <Card
            actions={[
              <Button
                type="link"
                icon={<PlaySquareOutlined />}
                href="/metronome"
              >
                Open
              </Button>,
            ]}
          >
            <Card.Meta title="Metronome" description="a simple metronome" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
