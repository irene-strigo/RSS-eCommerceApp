import { Header, Footer } from '../components';
import { PageWrapper, PromoContainer, SwitchButton } from '../components/common/CommonStyles';
import { Cart } from '@commercetools/platform-sdk';
import { CreateCart, DeleteProductInCart, GetCart } from '../services/Client';
import CartProductRow from '../components/CartProductRow';
import { Input } from '../components/common';
import { useEffect, useState } from 'react';

const CartPage = () => {
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
  }, []);

  const cartId = localStorage.getItem('cartId');

  return (
    <PageWrapper>
      <Header />
      {cart &&
        cart.lineItems.map((lineItem) => (
          <CartProductRow
            lineItem={lineItem}
            onClick={async (evt) => {
              evt.stopPropagation();
              if (cartId) {
                const newCart = await DeleteProductInCart(cartId, lineItem.id);
                setCart(newCart);
              }
            }}
          ></CartProductRow>
        ))}
      <PromoContainer>
        <label>Add promo code:</label>
        <Input type={'text'} name={''} onChange={() => console.log('input')}></Input>
        <SwitchButton>apply</SwitchButton>
      </PromoContainer>
      <div>Total price: {cart != null ? cart.totalPrice.centAmount / 100 : null} </div>
      <SwitchButton>remove all items from cart</SwitchButton>
      <Footer />
    </PageWrapper>
  );
};

export default CartPage;
