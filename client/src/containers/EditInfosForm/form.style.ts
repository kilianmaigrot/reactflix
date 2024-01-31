import { styled } from 'styled-components';

export const ComponentContainer = styled.article<{ $side: string }>`
  background-color: ${(props) => props.theme.top as string};
  width: 50%;
  min-height: 100vh;
  margin: 0;
  margin-left: ${({ $side }) => ($side === 'left' ? '0' : 'auto')};
  box-shadow: ${({ $side }) => ($side === 'left' ? '5px 0px 5px rgba(0,0,0,0.25);' : '-5px 0px 5px rgba(0,0,0,0.25);')};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ComponentContainerLight = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  justify-content: center;
  width: 70%;
  margin: auto;

  p,
  a {
    color: ${(props) => props.theme.background as string};
    opacity: 0.75;
  }
`;

export const FormTitle = styled.h2`
  color: ${(props) => props.theme.background as string};
  font-size: 2.5rem;
  margin-top: 0px;
  font-weight: 400;

  span {
    color: orange;
    font-weight: 600;
  }
`;

export const TopFormMessage = styled.p<{ $message: string }>`
  color: ${({ $message }) => ($message === 'inscriptionOk' ? 'limegreen' : 'red')};
  background-color: ${({ $message }) => ($message === 'inscriptionOk' || $message === 'editOk' || $message === 'editPasswordSuccess'
    ? 'rgba(144,238,144,0.2)'
    : 'rgba(255,0,0,0.2)')};
  display: ${({ $message }) => ($message ? 'block' : 'none')};
  font-size: 1.1rem;
  padding: 1rem;
  font-weight: 600;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const FormButton = styled.button`
  padding: 0.75rem 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  justify-self: center;
  border-radius: 1rem;
  border: none;
  background-color: orange;
  color: white;
  font-weight: 600;
`;
