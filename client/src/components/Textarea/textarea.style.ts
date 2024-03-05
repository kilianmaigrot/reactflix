import { styled } from 'styled-components';

export const LabelContainer = styled.label`
  color: ${(props) => props.theme.background as string};
  font-size: 1.5rem;
  box-sizing: border-box;
  opacity: 0.75;
`;

export const ErrorMessageSpan = styled.span<{ $display: string }>`
  color: red;
  display: inline;
  margin-left: 2.5rem;
  font-size: 1.25rem;
  display: ${({ $display }) => ($display ? 'inline' : 'none')};
`;

export const FormTextarea = styled.textarea<{ $displayBorder: boolean }>`
  width: 100%;
  padding: 1rem;
  font-size: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: ${({ $displayBorder }) => ($displayBorder ? '3px solid red' : '3px solid rgba(0,0,0,0)')};
  box-sizing: border-box;
`;
