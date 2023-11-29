import { Localized } from "@fluent/react";
import React from "react";
import { ComponentProps } from "react";
import "./Form.css";

export interface FormFieldProps extends ComponentProps<"div"> {
  name?: string;
  label?: string;
}

export function FormField(props: FormFieldProps) {
  const { label, name } = props;

  return (
    <div className="form__field">
      {label ? (
        <label className="form__field__label" htmlFor={name}>
          <Localized id={label}></Localized>
        </label>
      ) : null}
      {props.children}
    </div>
  );
}

export interface FormProps extends ComponentProps<"form"> {}

export function Form(props: FormProps) {
  return <form className="form">{props.children}</form>;
}
