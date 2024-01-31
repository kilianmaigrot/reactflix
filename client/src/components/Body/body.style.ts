import styled, { DefaultTheme } from 'styled-components';

interface PageBodyProps {
  theme: DefaultTheme;
}

export const PageBody = styled.div<PageBodyProps>`
  background: ${(props) => `url(${props.theme.bgImage})`} no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily as string};
`;

export const TextParagraph = styled.p<PageBodyProps>`
  text-align: center;
  font-size: 1.5rem;
`;
