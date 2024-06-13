import { LineItem } from '@commercetools/platform-sdk';

import {
  CartPictureContainer,
  CartRowButton,
  CartRowWrapper,
  CounterDiv,
  CountersContainer,
  ProductDataContainer,
} from './common/CommonStyles';
import ShowButton from './common/SwitchButton';

type Props = {
  lineItem: LineItem;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const CartProductRow = ({ lineItem, onClick }: Props) => {
  return (
    <CartRowWrapper>
      <ProductDataContainer>
        <CartPictureContainer
          alt="product-image"
          src={lineItem.variant.images ? lineItem.variant.images[0].url : ''}
        />
        <div>{lineItem.name.en}</div>
      </ProductDataContainer>
      <CountersContainer>
        <CounterDiv>price: {lineItem.price.value.centAmount / 100}</CounterDiv>
        <CartRowButton type="button">-</CartRowButton>
        <CounterDiv>quantity: {lineItem.quantity}</CounterDiv>
        <CartRowButton type="button">+</CartRowButton>
        <CounterDiv> total: {lineItem.totalPrice.centAmount / 100}</CounterDiv>
        <ShowButton type="button" label={'delete'} disabled={false} onClick={onClick} />
      </CountersContainer>
    </CartRowWrapper>
  );
};

export default CartProductRow;
