import { Header, Footer } from '../components';
import { PageWrapper, PromoContainer, SwitchButton } from '../components/common/CommonStyles';

import {
  ChangeLineItemQuantity,
  CreateCart,
  DeleteCart,
  DeleteProductInCart,
} from '../services/Client';
import CartProductRow from '../components/CartProductRow';
import { Input, NavigationButton } from '../components/common';

import { useCartItems } from '../components/common/CartItemsContext';

const CartPage = () => {
  const cartItems = useCartItems();
  const cart = cartItems.cart;

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
                cartItems.setCart(newCart);
              }
            }}
            onDelete={async (evt) => {
              evt.stopPropagation();
              if (cart.id) {
                const newCart = await DeleteProductInCart(cart.id, lineItem.id);
                cartItems.setCart(newCart);
              }
            }}
          ></CartProductRow>
        ))}
      {cart?.lineItems && cart?.lineItems.length != 0 && (
        <>
          <PromoContainer>
            <label>Add promo code:</label>
            <Input type={'text'} name={''} onChange={() => console.log('input')}></Input>
            <SwitchButton>apply</SwitchButton>
          </PromoContainer>
          <div>Total price: {cart != null ? cart.totalPrice.centAmount / 100 : null} </div>
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
        </>
      )}
      <Footer />
    </PageWrapper>
  );
};

export default CartPage;
