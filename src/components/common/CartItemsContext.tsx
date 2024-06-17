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
  loadCart: () => Promise<void>;
  updateQuantity: (cartData: Cart) => void;
};

const ItemsCount = createContext<CartItemsContextProviderProps>({
  items: 0,
  setItems: () => undefined,
  cart: null,
  setCart: () => undefined,
  loadCart: () => Promise.reject(),
  updateQuantity: () => undefined,
});

const CartItemsContextProvider = ({ children }: Props) => {
  const [items, setItems] = useState(0);
  const [cart, setCart] = useState<Cart | null>(null);

  const updateQuantity = (cartData: Cart) => {
    setCart(cartData);

    const cartQuantity = cartData.lineItems
      .map((item) => item.quantity)
      .reduce((cur, acc) => cur + acc, 0);
    setItems(cartQuantity);
  };

  const loadCart = async () => {
    const cartId = localStorage.getItem('cartId');
    let cartData = null;

    if (cartId) {
      cartData = await GetCart(cartId);
    } else {
      cartData = await CreateCart().then((crt) => GetCart(crt.id));
    }

    if (cartData) {
      updateQuantity(cartData);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <ItemsCount.Provider value={{ items, setItems, cart, setCart, loadCart, updateQuantity }}>
      {children}
    </ItemsCount.Provider>
  );
};

export const useCartItems = () => useContext(ItemsCount);

export default CartItemsContextProvider;
