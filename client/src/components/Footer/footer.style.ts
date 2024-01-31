import styled, { DefaultTheme } from 'styled-components';

interface PageBodyProps {
  theme: DefaultTheme;
}

const PageFooter = styled.footer<PageBodyProps>`
  padding-top: 2rem;
  margin-top: auto;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${(props) => props.theme.top as string};
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
`;

export default PageFooter;
