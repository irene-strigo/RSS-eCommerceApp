import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  grid-auto-rows: minmax(100px, auto);
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
