import { Header, Footer } from '../components';
import { PageWrapper, PromoContainer, SwitchButton } from '../components/common/CommonStyles';
import { Cart } from '@commercetools/platform-sdk';
import { CreateCart, GetCart } from '../services/Client';
import CartProductRow from '../components/CartProductRow';
import { Input } from '../components/common';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');
    // UpdateCart(cartId || '', '32c0240e-3686-4392-9649-f2bc234d8231')
    if (cartId) {
      GetCart(cartId).then((c) => setCart(c));
    } else {
      CreateCart().then((crt) => {
        GetCart(crt.id).then((c) => setCart(c));
      });
    }
  }, []);

  // UpdateCart('4666f6bc-c113-4ba6-bf5a-502d6394ca8f', 'eaf976a9-76d3-4c33-997a-a26e7ba0bf75')

  return (
    <PageWrapper>
      <Header />
      {cart &&
        cart.lineItems.map((lineItem) => <CartProductRow lineItem={lineItem}></CartProductRow>)}
      <PromoContainer>
        <label>Add promo code:</label>
        <Input type={'text'} name={''} onChange={() => console.log('input')}></Input>
        <SwitchButton>apply</SwitchButton>
      </PromoContainer>
      <div>Total price: </div>
      <SwitchButton>remove all items from cart</SwitchButton>
      <Footer />
    </PageWrapper>
  );
};

export default CartPage;
