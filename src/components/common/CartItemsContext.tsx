import React, { createContext, useContext, useState, useEffect } from 'react';

import { Cart } from '@commercetools/platform-sdk';
import { CreateCart, GetCart } from '../../services/Client';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

type CartItemsContextProviderProps = {
  items: number;
  setItems: (items: number) => void;
  cart: Cart | null;
  setCart: (cart: Cart) => void;
};

const ItemsCount = createContext<CartItemsContextProviderProps>({
  items: 0,
  setItems: () => undefined,
  cart: null,
  setCart: () => undefined,
});

const CartItemsContextProvider = ({ children }: Props) => {
  const [items, setItems] = useState(0);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      GetCart(cartId).then((c) => setCart(c));
    } else {
      CreateCart().then((crt) => {
        GetCart(crt.id).then((c) => setCart(c));
      });
    }

    const cartQuantity = cart?.lineItems
      .map((item) => item.quantity)
      .reduce((cur, acc) => cur + acc, 0);

    if (cartQuantity) setItems(cartQuantity);
  });

  return (
    <ItemsCount.Provider value={{ items, setItems, cart, setCart }}>{children}</ItemsCount.Provider>
  );
};

export const useCartItems = () => useContext(ItemsCount);

export default CartItemsContextProvider;
