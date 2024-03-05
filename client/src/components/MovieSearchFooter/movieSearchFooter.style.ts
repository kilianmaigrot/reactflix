import { styled } from 'styled-components';

export const MovieSearchFooter = styled.form`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 2rem;
  background-color: ${(props) => props.theme.top as string}E6;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  span {
    margin: 0px 0.5rem;
    color: white;
    text-align: center;
    white-space: nowrap;
  }
`;

export const DropDown = styled.select`
  margin: 0px 0.5rem;
  font-size: 1.25rem;
`;

export const FormInput = styled.input`
  margin: 0px 0.5rem;
  width: 80%;
  box-sizing: border-box;
  font-size: 1.25rem;
`;

export const FormButton = styled.button`
  margin: 0px 0.5rem;
  padding: 0.75rem 3rem;
  justify-self: center;
  border-radius: 1rem;
  border: none;
  background-color: orange;
  color: white;
  font-weight: 600;
`;
