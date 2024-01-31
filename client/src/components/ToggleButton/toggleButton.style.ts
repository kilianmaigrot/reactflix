import { styled } from 'styled-components';

export const ToggleContainer = styled.div`
  color: ${(props) => props.theme.background as string};
  display: flex;
  align-items: center;
`;

export const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 41px;
  height: 20px;
`;

export const ToggleSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.3s;
  cursor: pointer;
  background: #2c3e50;
  border-radius: 30px;

  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 2.4px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSpan} {
    background-color: #2c3e50;
  }

  &:checked + ${ToggleSpan}:before {
    transform: translateX(20px);
  }
`;

export const IconLightmode = styled.img<{ $darkmode: boolean }>`
  max-height: 2rem;
  margin: 0.25rem;
  filter: ${({ $darkmode }) => ($darkmode ? 'brightness(0.70)' : 'brightness(0.30)')};
`;

export const IconFlag = styled.img`
  max-height: 1.5rem;
  margin: 0.25rem;
`;
