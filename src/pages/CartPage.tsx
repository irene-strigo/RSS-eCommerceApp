import { Header, Footer } from '../components';

import {
  CartPricesNames,
  ErrorsText,
  InputElement,
  PageWrapper,
  PromoCodeAndPriceWrapper,
  PromoContainer,
  SwitchButton,
} from '../components/common/CommonStyles';
import { Cart } from '@commercetools/platform-sdk';


import {
  AddDiscountCode,
  ChangeLineItemQuantity,
  CreateCart,
  DeleteCart,
  DeleteProductInCart,
} from '../services/Client';
import CartProductRow from '../components/CartProductRow';

import { NavigationButton } from '../components/common';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [inputValue, setInputValue] = useState('');



import { useCartItems } from '../components/common/CartItemsContext';


    if (cartId) {
      GetCart(cartId).then((c) => setCart(c));
    } else {
      CreateCart().then((crt) => {
        GetCart(crt.id).then((c) => setCart(c));
      });
    }
  }, []);
  const showToast = (message: string) => {
    toast.success(message, {
      position: 'top-center',
    });
  };
  const showToastError = (message: string) => {
    toast.error(message, {
      position: 'top-center',
    });
  };
  let priceWithoutDiscounts = 0;
  if (cart?.discountOnTotalPrice) {
    priceWithoutDiscounts = cart.discountOnTotalPrice?.discountedAmount.centAmount / 10;
  }

const CartPage = () => {
  const cartItems = useCartItems();
  const cart = cartItems.cart;
  const updateQuantity = cartItems.updateQuantity;


  return (
    <PageWrapper>
      <Header />
      {cart?.lineItems.length === 0 && (
        <>
          <p>your cart is empty</p>
          <NavigationButton link={'/catalog'} label={'Catalog'} />
        </>
      )}

      {cart?.lineItems &&
        cart?.lineItems.map((lineItem) => (
          <CartProductRow
            key={lineItem.id}
            lineItem={lineItem}
            onChangeQty={async (evt, qty: number) => {
              evt.stopPropagation();
              if (cart.id) {
                const newCart = await ChangeLineItemQuantity(cart.id, lineItem.id, qty);
                updateQuantity(newCart);
              }
            }}
            onDelete={async (evt) => {
              evt.stopPropagation();
              if (cart.id) {
                const newCart = await DeleteProductInCart(cart.id, lineItem.id);
                updateQuantity(newCart);
              }
            }}
          ></CartProductRow>
        ))}
      {cart?.lineItems && cart?.lineItems.length != 0 && (
        <PromoCodeAndPriceWrapper>
          {!cart?.discountOnTotalPrice && (
            <PromoContainer>
              <label>Add promo code:</label>
              <InputElement
                type={'text'}
                name={'discountInput'}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <SwitchButton
                onClick={async (e) => {
                  try {
                    e.preventDefault();
                    const newCart = await AddDiscountCode(cart.id, inputValue);
                    setCart(newCart);
                    showToast('discount applied');
                  } catch (err) {
                    showToastError('wrong discount code!');
                  }
                }}
              >
                apply
              </SwitchButton>
            </PromoContainer>
          )}
          <div>
            <CartPricesNames> Final price:</CartPricesNames>{' '}
            {cart != null ? cart.totalPrice.centAmount / 100 : null} EUR
            {cart.discountCodes.length && (
              <>
                <p>
                  {' '}
                  <CartPricesNames>Price before discount:</CartPricesNames>
                  {cart != undefined ? priceWithoutDiscounts : null} EUR{' '}
                </p>
                <ErrorsText>Promocode is used</ErrorsText>
              </>
            )}
          </div>
          <SwitchButton
            onClick={async () => {
              if (cart.id) {
                await DeleteCart(cart.id);
                const newCart = await CreateCart();
                cartItems.setCart(newCart);
              }
            }}
          >
            clear cart
          </SwitchButton>
          <ToastContainer />
        </PromoCodeAndPriceWrapper>
      )}
      <Footer />
    </PageWrapper>
  );
};

export default CartPage;
