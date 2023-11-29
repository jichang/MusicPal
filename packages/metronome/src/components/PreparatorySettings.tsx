import { InputNumber } from 'antd';
import React, { useCallback, useId } from 'react';
import './PreparatorySettings.css';
import { Form, FormField } from './Form';

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
        onChangePreparatory(preparatory);
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
          max={20}
          step={1}
          value={preparatory}
          onChange={handleChangePreparatory}
        />
      </FormField>
    </Form>
  );
}
