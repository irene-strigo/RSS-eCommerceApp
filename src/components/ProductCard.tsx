import React from 'react';

import { Product } from '@commercetools/platform-sdk';

import { Label, Prices, SubmitButton, Slider, ProductCardWrapper } from './common';

type Props = {
  isCatDisplay: boolean;
  productData: Product;
  onClick?: () => void;
};

const ProductCard = ({ isCatDisplay, productData, onClick }: Props) => {
  const productDataToUse = productData.masterData.current;
  const { name, masterVariant, metaDescription } = productDataToUse;
  const description = metaDescription?.en || '';

  const pricesArray = masterVariant.prices || [];
  const imagesArray = masterVariant.images || [];

  const currentAmount = pricesArray[pricesArray.length - 1].value.centAmount;
  const amountBefore = pricesArray[pricesArray.length - 2].value.centAmount;
  const currencyCode = pricesArray[pricesArray.length - 1].value.currencyCode;

  return (
    <ProductCardWrapper onClick={onClick}>
      {imagesArray.length === 1 ? (
        <img src={imagesArray[0].url} />
      ) : (
        <Slider photos={imagesArray} />
      )}
      <Label fontSize={'25px'} fontWeight={600} color={'#000'} textDecor={'none'}>
        {name.en}
      </Label>
      {!isCatDisplay && (
        <Label fontSize={'20px'} fontWeight={400} color={'#000'} textDecor={'none'}>
          {description}
        </Label>
      )}
      <Prices
        currentAmount={currentAmount}
        amountBefore={amountBefore}
        currencyCode={currencyCode}
      />
      <SubmitButton label={'Add to cart'} />
    </ProductCardWrapper>
  );
};

export default ProductCard;
