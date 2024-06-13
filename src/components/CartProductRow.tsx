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
  onChangeQty: (e: React.MouseEvent<HTMLElement>, qty: number) => void;
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
};

const CartProductRow = ({ lineItem, onChangeQty, onDelete }: Props) => {
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
        <CartRowButton
          type="button"
          onClick={async (evt) => {
            onChangeQty(evt, lineItem.quantity - 1);
          }}
        >
          -
        </CartRowButton>
        <CounterDiv>quantity: {lineItem.quantity}</CounterDiv>
        <CartRowButton
          type="button"
          onClick={async (evt) => {
            onChangeQty(evt, lineItem.quantity + 1);
          }}
        >
          +
        </CartRowButton>
        <CounterDiv> total: {lineItem.totalPrice.centAmount / 100}</CounterDiv>
        <ShowButton type="button" label={'delete'} disabled={false} onClick={onDelete} />
      </CountersContainer>
    </CartRowWrapper>
  );
};

export default CartProductRow;
