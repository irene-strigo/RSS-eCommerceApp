import React, { useState, useEffect } from 'react';

import { ProductProjection } from '@commercetools/platform-sdk';
import { Label, Prices, Slider, ProductCardWrapper } from './common';
import { UpdateCart, DeleteProductInCart } from '../services/Client';
import ShowButton from './common/SwitchButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartItems } from '../components/common/CartItemsContext';

type Props = {
  setIsModal?: (isModal: boolean) => void;
  isCatDisplay: boolean;
  productData: ProductProjection;
  onClick?: () => void;
};

const ProductCard = ({ setIsModal, isCatDisplay, productData, onClick }: Props) => {
  const cartId = localStorage.getItem('cartId');
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

  const [isItemInCart, setIsItemInCart] = useState(false);
  const { cart, loadCart } = useCartItems();
  const items = cart?.lineItems;

  const handleClick = async (evt: React.MouseEvent) => {
    evt.stopPropagation();

    if (isItemInCart) {
      showToast('item removed from cart');
      const lineItemId =
        cart?.lineItems.find((item) => item.productId === productData.id)?.id || '';
      await DeleteProductInCart(cartId ? cartId : '', lineItemId);
    } else {
      showToast('item added to cart');
      await UpdateCart(cartId ? cartId : '', productData.id);
    }

    await loadCart();
  };

  useEffect(() => {
    setIsItemInCart(!!items?.find((item) => item.productId === productData.id));
  }, [cart]);

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
        label={isItemInCart ? 'remove' : 'add to cart'}
        type={'button'}
        disabled={false}
        onClick={handleClick}
      />
    </ProductCardWrapper>
  );
};

export default ProductCard;
