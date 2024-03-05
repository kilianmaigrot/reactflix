import { styled } from 'styled-components';

export const MovieListContainer = styled.div`
  display: flex;
  flex-direction: column;    
  align-items: center;
`;

export const MovieBoardContainer = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const MovieBoardTop = styled.article`
  display: flex;
  flex-wrap: wrap;
`;

export const TopFormMessage = styled.p<{ $message: string }>`
  color: red};
  background-color: rgba(255,0,0,0.2)};
  display: ${({ $message }) => ($message ? 'block' : 'none')};
  font-size: 1.1rem;
  padding: 1rem;
  font-weight: 600;
`;
