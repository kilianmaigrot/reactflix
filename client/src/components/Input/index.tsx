import React, { FC, ChangeEvent, FocusEvent } from 'react';
import * as SC from './input.style';

interface InputComponentProps {
  name: string;
  type: string;
  label: string;
  placeHolder: string;
  errorMessage: string;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: FC<InputComponentProps> = ({
  name,
  type,
  label,
  placeHolder,
  errorMessage,
  onBlur,
  value,
  onChange,
}: InputComponentProps) => (
  <SC.LabelContainer htmlFor={name}>
    {label}
    <SC.ErrorMessageSpan $display={errorMessage}>{errorMessage}</SC.ErrorMessageSpan>
    <SC.FormInput
      $displayBorder={!!errorMessage}
      type={type}
      name={name}
      placeholder={placeHolder}
      aria-label={`${name}-input-field`}
      onBlur={(event) => onBlur(event)}
      value={value}
      onChange={(event) => onChange(event)}
      autoComplete='off'
    />
  </SC.LabelContainer>
);

export default InputComponent;
