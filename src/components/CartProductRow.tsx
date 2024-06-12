import { LineItem } from '@commercetools/platform-sdk';

import {
  CartPictureContainer,
  CartRowButton,
  CartRowWrapper,
  CounterDiv,
  CountersContainer,
  ProductDataContainer,
  SwitchButton,
} from './common/CommonStyles';

type Props = {
  lineItem: LineItem;
};

const CartProductRow = ({ lineItem }: Props) => {
  /* const [firstName, setFirstName] = useState('');
   const [firstPrice, setFirstPrice] = useState(0);
   const [firstImg, setFirstImg] = useState('');
 
 
   useEffect(() => {
     getProductById("32c0240e-3686-4392-9649-f2bc234d8231")
       .then((data) => {
         setFirstName(data.name.en);
         if (data.masterVariant.prices) {
           setFirstPrice(data.masterVariant.prices[0].value.centAmount);
         }
         if (data.masterVariant.images) {
           setFirstImg(data.masterVariant.images[0].url);
         }
       })
   })
 
   console.log(firstName, firstPrice, firstImg)*/
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
        <CounterDiv>price for one: {lineItem.price.value.centAmount / 100}</CounterDiv>
        <CartRowButton type="button">-</CartRowButton>
        <CounterDiv>quantity: {lineItem.quantity}</CounterDiv>
        <CartRowButton type="button">+</CartRowButton>
        <CounterDiv> total price: {lineItem.totalPrice.centAmount / 100}</CounterDiv>
        <SwitchButton type="button">delete</SwitchButton>
      </CountersContainer>
    </CartRowWrapper>
  );
};

export default CartProductRow;
