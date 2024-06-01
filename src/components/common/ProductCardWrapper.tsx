import styled from 'styled-components';

import { SliderContainer } from './Slider';

export const ProductCardWrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  color: #000;
  position: relative;
  min-height: 620px;
  max-width: 400px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 200px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  & ${SliderContainer} {
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

    & ${SliderContainer} {
      transform: scale(1.05);
    }
  }
`;
