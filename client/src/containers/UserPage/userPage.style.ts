import { styled } from 'styled-components';

export const ComponentContainer = styled.article`
  display: flex;
  flex-grow: 2;
  justify-content: space-around;
`;

export const TextParagraph = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-decoration: none;
  width: 75%;
  margin: auto;
`;

export const FormButton = styled.button`
  padding: 0.5rem 2rem 0.5rem 2rem;
  margin: 1rem;
  font-size: 1.5rem;
  justify-self: center;
  border-radius: 1rem;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.top as string};
  }
`;

export const BackButton = styled.button`
padding: 0.25rem 1rem 0.25rem 1rem;
margin: 0.5rem;
font-size: 0.75rem;
justify-self: center;
border-radius: 0.5rem;
`;

export const SideContainers = styled.article`
  background-color: ${(props) => props.theme.top as string}bb;
  color: ${(props) => props.theme.background as string};
  border-radius: 12px;
  border: 1px solid black;
  box-shadow: 10px 5px 5px black;
  min-height: 100%;
  padding: 0.5rem;
`;

export const LeftSideContainer = styled(SideContainers)`
  width: 35%;
`;

export const RightSideContainer = styled(SideContainers)<{ $display?: boolean }>`
  width: 55%;
  visibility: ${(props) => (props.$display ? 'visible' : 'hidden')};
`;

export const FormContainer = styled.div<{ $display?: boolean }>`
  display: ${(props) => (props.$display ? 'inline' : 'none')};
`;
