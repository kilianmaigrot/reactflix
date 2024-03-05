import React, { FC, ChangeEvent, FocusEvent } from 'react';
import * as SC from './textarea.style';

interface TextareaComponentProps {
  name: string;
  label: string;
  placeHolder: string;
  errorMessage: string;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  autofocus?: boolean;
  autoComplete: string;
}

const TextareaComponent: FC<TextareaComponentProps> = ({
  name,
  label,
  placeHolder,
  errorMessage,
  onBlur,
  value,
  onChange,
  autofocus = false,
  autoComplete,
}: TextareaComponentProps) => (
  <SC.LabelContainer id={`${name}-label`} htmlFor={name}>
    {label}
    <SC.ErrorMessageSpan $display={errorMessage}>{errorMessage}</SC.ErrorMessageSpan>
    <SC.FormTextarea
      $displayBorder={!!errorMessage}
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

export default TextareaComponent;
