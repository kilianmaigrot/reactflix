import { styled } from 'styled-components';

export const PageHeader = styled.header`
  background-color: ${(props) => props.theme.top as string};
  margin-bottom: 2rem;
  padding: 1.25rem 0.5rem 1.25rem 0.5rem;
  display: flex;
  align-items: center;
`;

export const HeaderImage = styled.img`
  max-width: 240px;
  width: 100%;
  margin-left: 1rem;
`;

export const NavContainer = styled.nav<{ $display?: boolean }>`
  display: ${(props) => (props.$display === false ? 'none' : 'inline')};
  margin: 0rem 2rem;
`;

export const NavButton = styled.button`
  padding: 0.5rem;
  margin-left: 1rem;
  justify-self: center;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  a {
    text-decoration: none;
    color: black;
  }
`;

export const UserInfos = styled.a<{ $display?: boolean }>`
  display: ${(props) => (props.$display === false ? 'none' : 'flex')};
  color: ${(props) => props.theme.background as string};
  margin-left: auto;
  text-decoration: none;
`;
