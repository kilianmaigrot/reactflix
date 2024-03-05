import { styled } from 'styled-components';

export const ComponentContainer = styled.article<{ $side: string }>`
  background-color: ${(props) => props.theme.top as string}B3;
  width: 60%;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.5rem;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
`;

export const FormTitle = styled.h2`
  color: ${(props) => props.theme.background as string};
  font-size: 2rem;
  margin-top: 0px;
  font-weight: 400;
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
