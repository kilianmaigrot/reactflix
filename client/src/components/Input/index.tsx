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
  autofocus?: boolean;
  autoComplete: string;
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
  autofocus = false,
  autoComplete,
}: InputComponentProps) => (
  <SC.LabelContainer id={`${name}-label`} htmlFor={name}>
    {label}
    <SC.ErrorMessageSpan $display={errorMessage}>{errorMessage}</SC.ErrorMessageSpan>
    <SC.FormInput
      $displayBorder={!!errorMessage}
      type={type}
      id={name}
      name={name}
      placeholder={placeHolder}
      aria-labelledby={`${name}-label`}
      onBlur={(event) => onBlur(event)}
      value={value}
      onChange={(event) => onChange(event)}
      autoComplete={autoComplete}
      autoFocus={autofocus}
    />
  </SC.LabelContainer>
);

export default InputComponent;
