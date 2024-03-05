import { styled } from 'styled-components';

export const MovieTileContainer = styled.article`
  width: 30%;
  background-color: ${(props) => props.theme.top as string}E6;
  color: ${(props) => props.theme.background as string};
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem
`;

export const AdminDeleteButton = styled.button<{ $display: string }>`
  display: ${(props) => (props.$display === 'admin' ? 'block' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  font-size: 2rem;
`;

export const TopPart = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const TopPartHalf = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  min-width: 50%;
  margin-left: 0.75rem;
  ul {
    padding-left: 1rem;
  }
  position: relative;
`;

export const MoviePoster = styled.img`
  width: 45%;
  max-height: 50%;
  object-fit: contain;
  margin: 0 auto 0.5rem auto;
`;

export const ButtonTrailer = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  background-color: red;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.background as string};
    font-size: 1.35rem;
  }
`;

export const MovieTitle = styled.h2`
  margin: 0px;
  font-size: 2rem;
  text-align: center;
`;

export const MovieDetails = styled.div`
font-size: 1.2rem;
  ul {
    list-style: none;

    li {
      padding-bottom: 0.5rem;
    }
  }
`;

export const MovieResume = styled.p`
  padding: 1rem 1rem 0 1rem;
`;

export const ActorsArea = styled.div`
  padding: 0 1rem;
`;
