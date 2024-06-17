import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Button = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 10px 10px;
  font-size: clamp(1rem, 1vw, 1.5rem);

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
`;
export const ContentWrapper = styled.div<{
  $alignItems: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignItems }) => $alignItems};
  background-color: #f7f9ff;
  width: 100%;
  padding: 40px 0px;
  height: 100%;
  overflow-x: auto;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  width: 100%;

  & button {
    margin-top: 30px;
    width: 95px;
  }

  & fieldset {
    width: 100%;
    margin: 15px 0 15px;
  }
`;

export const NavButton = styled(Link)`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 10px 10px;
  text-align: center;
  margin-left: 20px;
  text-decoration: none;
  font-size: clamp(1rem, 1vw, 1.5rem);
  white-space: nowrap;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
  @media screen and (max-width: 900px) {
    margin: 5px;
    font-size: clamp(0.7rem, 1vw, 1.5rem);
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const ToggleButton = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  max-width: 300px;
  color: #511f31;
  cursor: pointer;
  padding: 3px 3px;
  margin: 10px;
  white-space: nowrap;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
  &:disabled {
    background-color: #c0c0c0;
    color: black;
  }
`;
export const SwitchButton = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  max-width: 300px;
  color: #511f31;
  cursor: pointer;
  padding: 3px 3px;
  margin: 10px;
  white-space: nowrap;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
  &:disabled {
    background-color: #c0c0c0;
    color: black;
  }
`;
export const ErrorDiv = styled.div`
  color: red;
  display: flex;
  text-align: center;
`;

export const InputElement = styled.input`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: clamp(1rem, 1vw, 1.5rem);
  padding: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 100%;
  padding: 20px 40px;
  background-color: #d8e1ff;
  @media screen and (max-width: 900px) {
    justify-content: center;
  }
`;

export const HeaderButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  max-width: 350px;
  min-width: 250px;
  width: 100%;
  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 40px;
  background-color: #d8e1ff;
  height: 65px;
`;

export const FooterLink = styled.a`
  text-decoration: none;
  color: #974160;
  font-size: clamp(1rem, 0.7vw, 1.5rem);

  &:hover {
    color: #69ddff;
  }
  @media screen and (max-width: 900px) {
    font-size: clamp(0.7rem, 1vw, 1.5rem);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 20em;
  font-size: clamp(1rem, 1vw, 1.5rem);

  & button {
    white-space: nowrap;
  }

  & fieldset {
    width: 100%;
    margin: 15px 0 15px;
  }
`;
export const InputElem = styled.input`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: clamp(1rem, 1vw, 1.5rem);
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;

export const ButtonSubmit = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 10px 10px;
  font-size: clamp(1rem, 1vw, 1.5rem);

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }

  &:disabled {
    background-color: #c0c0c0;
    color: black;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f9ff;
  width: 100%;
  height: 100%;
  padding: 20px;
  font-size: clamp(1rem, 3vw, 1.5rem);

  @media screen and (max-width: 400px) {
    font-size: clamp(1rem, 4vw, 5rem);
  }
`;

export const ErrorsText = styled.p`
  color: red;
  font-size: clamp(1rem, 1vw, 1.5rem);
`;

export const ErrorMessage = styled.div`
  margin: auto;
  font-size: clamp(1rem, 2vw, 1.5rem);
`;
export const DefaultCheckboxLabel = styled.label`
  font-size: clamp(1rem, 1vw, 1.5rem);
  display: flex;
  flex-direction: column;
  white-space: nowrap;
`;

export const SelectElem = styled.select`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: clamp(1rem, 1vw, 1.5rem);
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;
export const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const FieldName = styled.span`
  color: #39739d;
`;

export const EditButtonsConainer = styled.div`
  margin: 5px;
  border: 1px solid #ada5f9;
  display: flex;
`;

export const AddressContainer = styled.div`
  border: 1px solid #ada5f9;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const CheckboxesWrapper = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    border: 1px solid gray;
  }
`;

export const AddressFieldContainer = styled.p`
  width: 50%;
  white-space: nowrap;
  font-size: clamp(1rem, 1vw, 1.5rem);
  padding: 10px;
  max-height: 45px;
  @media screen and (max-width: 900px) {
    font-size: clamp(1rem, 1vw, 1.5rem);
    max-height: unset;
    white-space: wrap;
  }
`;

export const FiltersFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const SortersDiv = styled.div`
  display: contents;
`;

export const ProductSearchInput = styled.input`
  min-height: 30px;
  min-width: 200px;
  margin: 10px 0 10px;
`;
export const CartRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid black;
`;

export const ProductDataContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  font-size: clamp(1rem, 1vw, 1.5rem);
  gap: 20px;
`;

export const CountersContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

export const CartRowButton = styled.button`
background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 0 10px;
  font-size: clamp(1.5rem, 2vw, 1.5rem);
  margin: 5px;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
`;

export const PromoContainer = styled.div``;

export const CartPictureContainer = styled.img`
  max-height: 100px;
`;
export const CounterDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const Banner = styled.img`
  max-height: 20em;
`;
export const BannerContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;
export const BannerHeading = styled.p`
  font-size: clamp(2rem, 3vw, 5rem);
  color: green;
`;

export const PromocodeName = styled.span`
  color: #ed7412;
  font-size: clamp(3rem, 7vw, 8rem);
  font-weight: 600;
  position: absolute;
  top: 100px;
  outline: 1px solid white;
`;
export const BannerDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PromoCodeAndPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: clamp(1rem, 2vw, 5rem);
`;
export const CartPricesNames = styled.span`
  color: #39739d;
  font-weight: 500;
`;

export const PortraitImg = styled.img`
  max-height: 200px;
`;

export const LogoLink = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: #974160;
  font-size: clamp(1rem, 0.7vw, 1.5rem);

  &:hover {
    color: #69ddff;
  }
  @media screen and (max-width: 900px) {
    font-size: clamp(0.7rem, 1vw, 1.5rem);
  }
`;
