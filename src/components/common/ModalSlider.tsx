import React from 'react';
import styled from 'styled-components';

import Slider from './Slider';
import { ProductProjection } from '@commercetools/platform-sdk';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  max-width: 650px;
  width: 100%;
  height: 700px;
  padding: 10px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 30;
`;

const CrossWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  width: 21px;
  height: 21px;
  cursor: pointer;
  top: 40px;
  right: 50px;
`;

const FirstLine = styled.div`
  background-color: #000;
  height: 20px;
  width: 3px;
  height: 100%;
  transform: rotate(45deg);
  position: absolute;
  transform-origin: center;
`;

const SecondLine = styled.div`
  background-color: #000;
  height: 20px;
  height: 20px;
  width: 3px;
  transform: rotate(-45deg);
  position: absolute;
  transform-origin: center;
`;

type Props = {
  productData: ProductProjection;
  setIsModal: (isModal: boolean) => void;
};

const ModalSlider = ({ productData, setIsModal }: Props) => {
  const imagesArray = productData.masterVariant.images || [];

  return (
    <Wrapper>
      <CrossWrapper onClick={() => setIsModal(false)}>
        <FirstLine />
        <SecondLine />
      </CrossWrapper>
      {imagesArray.length === 1 ? (
        <img src={imagesArray[0].url} />
      ) : (
        <Slider photos={imagesArray} />
      )}
    </Wrapper>
  );
};

export default ModalSlider;
