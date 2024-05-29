import React from 'react';

import styled from 'styled-components';

import { Product } from '@commercetools/platform-sdk';

import { Label, Prices } from '../components/common';
import { SubmitButton, Slider } from '../components/common';

const ProductCartWrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  color: #000;
  position: relative;
  min-height: 520px;

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

type Props = {
  productData: Product;
};

const ProductPage = ({ productData }: Props) => {
  const productDataToUse = productData.masterData.current;
  const { name, masterVariant } = productDataToUse;

  const pricesArray = masterVariant.prices || [];
  const imagesArray = masterVariant.images || [];

  const currentAmount = pricesArray[pricesArray.length - 1].value.centAmount;
  const amountBefore = pricesArray[pricesArray.length - 2].value.centAmount;
  const currencyCode = pricesArray[pricesArray.length - 1].value.currencyCode;

  return (
    <ProductCartWrapper>
      {imagesArray.length === 1 ? (
        <img src={imagesArray[0].url} />
      ) : (
        <Slider photos={imagesArray} />
      )}
      <Label fontSize={'25px'} fontWeight={600} color={'#000'} textDecor={'none'}>
        {name.en}
      </Label>
      <Prices
        currentAmount={currentAmount}
        amountBefore={amountBefore}
        currencyCode={currencyCode}
      />
      <SubmitButton label={'Add to cart'} />
    </ProductCartWrapper>
  );
};

export default ProductPage;
