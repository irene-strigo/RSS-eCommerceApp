import styled from 'styled-components';

export const ProductCardWrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  color: #000;
  position: relative;
  min-height: 700px;
  max-width: 400px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 200px;
    margin-bottom: 20px;
    cursor: pointer;
    transform: scale(1);
    transition: 0.3s;
  }

  & :nth-child(2) {
    cursor: pointer;
  }

  & button {
    position: absolute;
    bottom: 20px;
  }

  &:hover {
    background-color: #d8e1ff;
    transition: 0.3s;

    & img {
      transform: scale(1.05);
    }
  }
`;
