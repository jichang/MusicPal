import { InputNumber, Select } from 'antd';
import React, { useCallback, useId, useState } from 'react';
import { Localized } from '@fluent/react';
import './PreparatorySettings.css';
import { Form, FormField, FormFieldGroup } from './Form';
import { UNIFORM_BPM_60, VARYING_BPM_60 } from '@musicpal/music';

export interface PreparatorySettingsProps {
  preparatory: number;
  onChangePreparatory: (preparatory: number) => void;
}

export function PreparatorySettings(props: PreparatorySettingsProps) {
  const { preparatory, onChangePreparatory } = props;
  const id = useId();

  const handleChangePreparatory = useCallback(
    (preparatory: number | null) => {
      if (preparatory) {
        onChangePreparatory(preparatory * 1000);
      }
    },
    [onChangePreparatory],
  );

  return (
    <Form
      autoComplete="off"
      name="preparatory__settings"
      className="preparatory__settings"
    >
      <FormField name={`${id}-prepratory`} label="prepratory">
        <InputNumber
          id={`${id}-prepratory`}
          min={1}
          max={10}
          step={1}
          value={preparatory / 1000}
          onChange={handleChangePreparatory}
        />
      </FormField>
    </Form>
  );
}
