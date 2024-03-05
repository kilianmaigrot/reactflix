import { styled } from 'styled-components';

export const Modal = styled.div`
  max-width: 500px;
  background-color: ${(props) => props.theme.top as string}E6;
  color: ${(props) => props.theme.background as string};
  position: fixed;
  top: 75px;
  z-index: 5;
  border-radius: 0.75rem;
  max-height: calc(100% - 200px);
  left: calc(50% - 250px);
  display: 'flex';
  flex-direction: column;
  font-family: ${(props) => props.theme.fontFamily as string};
`;

export const ModalContent = styled.div`
  overflow: auto;
  padding: 1.25rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  padding: 1.25rem;
  padding-top: 0rem;
  justify-content: space-around;
`;

export const ModaleButton = styled.button`
  padding: 0.50rem 1rem;
  justify-self: center;
  border-radius: 0.5rem;
  border: none;
  background-color: orange;
  color: white;
  font-weight: 500;
`;

export const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

export const ModalBanner = styled.div`
  text-align: center;
  background-color: orange;
  color: white;
  padding: 10px;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  font-size: 1.25rem;
`;

export const Input = styled.input`
  text-align: right;
  width: 200px;
  margin-left: 15px;
`;
