import React from 'react';

import styled from 'styled-components';
import Label from './Label';

const PricesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 80px;

  & :first-child {
    margin-right: 10px;
  }
`;

type Props = {
  currentAmount: number;
  amountBefore: number;
  currencyCode: string;
};

const Prices = ({ currentAmount, amountBefore, currencyCode }: Props) => {
  const priceConverter = (price: number = 0, currency: string = '') => {
    const dollarPrice = `${price / 100} ${currency}`;

    return dollarPrice;
  };

  return (
    <PricesWrapper>
      {currentAmount < amountBefore ? (
        <>
          <Label fontSize={'20px'} fontWeight={600} color={'#000'} textDecor={'line-through'}>
            {priceConverter(amountBefore, '')}
          </Label>
          <Label fontSize={'20px'} fontWeight={600} color={'#f56d6d'} textDecor={'none'}>
            {priceConverter(currentAmount, currencyCode)}
          </Label>
        </>
      ) : (
        <Label fontSize={'20px'} fontWeight={600} color={'#000'} textDecor={'none'}>
          {priceConverter(currentAmount, currencyCode)}
        </Label>
      )}
    </PricesWrapper>
  );
};

export default Prices;
