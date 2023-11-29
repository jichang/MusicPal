import React from "react";
import "./Fill.css";

export interface FillProps {
  children?: React.ReactNode;
}

export function Fill(props: FillProps) {
  const { children } = props;
  return <div className="fill">{children}</div>;
}
