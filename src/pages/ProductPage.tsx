import React from 'react';

import styled from 'styled-components';

import { Product } from '@commercetools/platform-sdk';

import { Label } from '../components/common';
import { SubmitButton } from '../components/common';

const ProductCartWrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  color: #000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & img {
    width: 200px;
  }
`;

type Props = {
  productData: Product;
};

const ProductPage = ({ productData }: Props) => {
  const productDataToUse = productData.masterData.current;
  const { name, metaDescription, masterVariant } = productDataToUse;

  const pricesArray = masterVariant.prices || [];
  const imagesArray = masterVariant.images || [];

  const amount = pricesArray[pricesArray.length - 1].value.centAmount;
  const currencyCode = pricesArray[pricesArray.length - 1].value.currencyCode;
  const imageUrl = imagesArray[0].url;

  const priceConverter = (price: number = 0, currency: string = '') => {
    const dollarPrice = `${price / 100} ${currency}`;

    return dollarPrice;
  };

  return (
    <ProductCartWrapper>
      <Label fontSize={'25px'} fontWeight={600}>
        {name.en}
      </Label>
      <img src={imageUrl} />
      <Label fontSize={'16px'} fontWeight={400}>
        {metaDescription ? metaDescription.en : ''}
      </Label>
      <Label fontSize={'20px'} fontWeight={600}>
        {priceConverter(amount, currencyCode)}
      </Label>
      <SubmitButton label={'Add to cart'} />
    </ProductCartWrapper>
  );
};

export default ProductPage;
