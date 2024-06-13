import React from 'react';

import { ProductProjection } from '@commercetools/platform-sdk';
import { Label, Prices, Slider, ProductCardWrapper } from './common';
import { UpdateCart } from '../services/Client';
import ShowButton from './common/SwitchButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  setIsModal?: (isModal: boolean) => void;
  isCatDisplay: boolean;
  productData: ProductProjection;
  onClick?: () => void;
};
const cartId = localStorage.getItem('cartId');
const ProductCard = ({ setIsModal, isCatDisplay, productData, onClick }: Props) => {
  const { name, masterVariant, metaDescription } = productData;
  const description = metaDescription?.en || '';

  const pricesArray = masterVariant.prices || [];
  const imagesArray = masterVariant.images || [];

  const currentAmount = pricesArray[pricesArray.length - 1].value.centAmount;
  const amountBefore = pricesArray[pricesArray.length - 2].value.centAmount;
  const currencyCode = pricesArray[pricesArray.length - 1].value.currencyCode;

  const showToast = (message: string) => {
    toast.success(message, {
      position: 'top-center',
    });
  };

  return (
    <ProductCardWrapper onClick={onClick}>
      {imagesArray.length === 1 ? (
        <img alt="{name.en}" src={imagesArray[0].url} />
      ) : (
        <Slider photos={imagesArray} setIsModal={setIsModal} />
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
      <ShowButton
        label={'add to cart'}
        type={'button'}
        disabled={false}
        onClick={(evt) => {
          evt.stopPropagation();
          UpdateCart(cartId ? cartId : '', productData.id);
          showToast('item added to cart');
        }}
      />
      <ToastContainer />
    </ProductCardWrapper>
  );
};

export default ProductCard;
